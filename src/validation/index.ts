export function required(value: any) {
  return value && value.length !== 0
    ? undefined
    : "Поле обязательно должно быть заполнено";
}

export function requiredBlock(value: any) {
  return value && value !== undefined
    ? value.name.length !== 0
      ? undefined
      : "Поле обязательно должно быть заполнено"
    : "Поле обязательно должно быть заполнено";
}
