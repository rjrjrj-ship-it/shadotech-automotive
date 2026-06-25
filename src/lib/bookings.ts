import { getSupabase } from "@/lib/supabase";

export interface Booking {
  id: string;
  status: "pending" | "confirmed" | "cancelled";
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  brand: string;
  model: string;
  years: string;
  finition: string;
  service: string;
  serviceLabel: string;
  price: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  paymentMethod: "stripe" | "paypal" | null;
  paymentId: string | null;
  createdAt: string;
  createdBy: string | null;
}

// ─── Row ↔ Booking mapping ───────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function fromRow(r: any): Booking {
  return {
    id:            r.id,
    status:        r.status,
    date:          r.date,
    startTime:     r.start_time,
    endTime:       r.end_time,
    duration:      r.duration,
    brand:         r.brand,
    model:         r.model,
    years:         r.years ?? "",
    finition:      r.finition ?? "",
    service:       r.service,
    serviceLabel:  r.service_label,
    price:         Number(r.price),
    firstName:     r.first_name,
    lastName:      r.last_name,
    email:         r.email,
    phone:         r.phone,
    paymentMethod: r.payment_method ?? null,
    paymentId:     r.payment_id ?? null,
    createdAt:     r.created_at,
    createdBy:     r.created_by ?? null,
  };
}

// ─── CRUD ─────────────────────────────────────────────────────────────────────

export async function getBookings(): Promise<Booking[]> {
  const { data, error } = await getSupabase()
    .from("bookings")
    .select("*")
    .order("date", { ascending: true });
  if (error) throw error;
  return (data ?? []).map(fromRow);
}

export async function getBookingById(id: string): Promise<Booking | null> {
  const { data, error } = await getSupabase()
    .from("bookings")
    .select("*")
    .eq("id", id)
    .single();
  if (error) return null;
  return fromRow(data);
}

export async function createBooking(
  input: Omit<Booking, "id" | "createdAt" | "status"> & { createdBy?: string | null }
): Promise<Booking> {
  const id = `BK-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const row = {
    id,
    status:         "pending",
    date:           input.date,
    start_time:     input.startTime,
    end_time:       input.endTime,
    duration:       input.duration,
    brand:          input.brand,
    model:          input.model,
    years:          input.years,
    finition:       input.finition,
    service:        input.service,
    service_label:  input.serviceLabel,
    price:          input.price,
    first_name:     input.firstName,
    last_name:      input.lastName,
    email:          input.email,
    phone:          input.phone,
    payment_method: input.paymentMethod,
    payment_id:     input.paymentId,
    created_at:     new Date().toISOString(),
    created_by:     input.createdBy ?? null,
  };
  const { data, error } = await getSupabase().from("bookings").insert(row).select().single();
  if (error) throw error;
  return fromRow(data);
}

export async function confirmBooking(id: string, paymentId: string): Promise<Booking | null> {
  const { data, error } = await getSupabase()
    .from("bookings")
    .update({ status: "confirmed", payment_id: paymentId })
    .eq("id", id)
    .select()
    .single();
  if (error) return null;
  return fromRow(data);
}

export async function cancelBooking(id: string): Promise<boolean> {
  const { error } = await getSupabase()
    .from("bookings")
    .update({ status: "cancelled" })
    .eq("id", id);
  return !error;
}

// ─── Slot logic ───────────────────────────────────────────────────────────────

const BREAK = { start: "12:30", end: "13:00" };
const PENDING_TTL_MS = 30 * 60 * 1000;

export async function cleanupExpiredPending(): Promise<void> {
  const cutoff = new Date(Date.now() - PENDING_TTL_MS).toISOString();
  await getSupabase()
    .from("bookings")
    .update({ status: "cancelled" })
    .eq("status", "pending")
    .lt("created_at", cutoff);
}

export async function getOccupiedSlots(date: string): Promise<{ start: string; end: string }[]> {
  try {
    await cleanupExpiredPending();
    const { data, error } = await getSupabase()
      .from("bookings")
      .select("start_time, end_time")
      .eq("date", date)
      .neq("status", "cancelled");
    if (error) throw error;
    const booked = (data ?? []).map((r) => ({ start: r.start_time, end: r.end_time }));
    return [BREAK, ...booked];
  } catch (e) {
    console.error("[getOccupiedSlots] Supabase error:", e);
    return [BREAK]; // fallback: show all slots except lunch break
  }
}

export async function getAvailableSlots(date: string, duration: number): Promise<string[]> {
  const dayOfWeek = new Date(date).getDay();
  if (dayOfWeek === 0) return [];

  const occupied = await getOccupiedSlots(date);
  const slots: string[] = [];
  const dayStart = 9 * 60;
  const dayEnd   = 18 * 60;

  for (let t = dayStart; t + duration <= dayEnd; t += 30) {
    const tEnd = t + duration;
    const blocked = occupied.some((o) => {
      const oS = toMin(o.start), oE = toMin(o.end);
      return t < oE && tEnd > oS;
    });
    if (!blocked) slots.push(fromMin(t));
  }
  return slots;
}

function toMin(t: string): number {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
}
function fromMin(m: number): string {
  return `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
}
