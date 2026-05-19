import type { FieldErrors, FieldValues } from "react-hook-form";

export function getFirstErrorMessage<T extends FieldValues>(errors: FieldErrors<T>): string | null {
  for (const value of Object.values(errors)) {
    if (!value) {
      continue;
    }

    if ("message" in value && typeof value.message === "string") {
      return value.message;
    }

    if (typeof value === "object") {
      const nested = getFirstErrorMessage(value as FieldErrors<T>);
      if (nested) {
        return nested;
      }
    }
  }

  return null;
}

export function scrollToFirstFormError<T extends FieldValues>(errors: FieldErrors<T>): void {
  const fieldNames = Object.keys(errors);
  if (fieldNames.length === 0) {
    return;
  }

  const firstName = fieldNames[0];
  const element =
    document.querySelector(`[name="${firstName}"]`) ??
    document.querySelector(`[id="${firstName}"]`);

  element?.scrollIntoView({ behavior: "smooth", block: "center" });

  if (element instanceof HTMLElement) {
    element.focus({ preventScroll: true });
  }
}
