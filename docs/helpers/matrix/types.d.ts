export type Entry<Props> = { [key in keyof Props]?: Props[key] };

export type Entries<Props> = { [key in keyof Props]?: readonly Props[key][] };
