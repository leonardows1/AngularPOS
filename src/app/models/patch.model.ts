export interface PatchDTO {
  operationType?: number,
  path: string,
  op: Operations,
  from?: string,
  value: any
}

export enum Operations{
  add = "add",
  remove = "remove",
  replace = "replace",
  copy = "copy",
  move = "move",
  test = "test"
}
