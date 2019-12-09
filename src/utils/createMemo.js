import { useMemo } from "react";

export const createMemo = fn => (...args) => useMemo(() => fn(...args), args);
