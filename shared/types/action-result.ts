export type ActionResult<T = undefined> = | { success: true; data?: T; } | { success: false; error: string; };
