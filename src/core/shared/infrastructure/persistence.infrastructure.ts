export class PersistenceLocalStorage<
  DomainProps extends { id: string },
  Domain,
> {
  db: DomainProps[] = [];
  constructor(
    private table: string,
    private fromPrimitives: Function,
    mocks: DomainProps[],
  ) {
    if (!localStorage.getItem(this.table)) {
      localStorage.setItem(this.table, JSON.stringify(mocks));
    }

    this.db = localStorage.getItem(this.table)
      ? (JSON.parse(localStorage.getItem(this.table)!) as DomainProps[])
      : mocks;
  }

  getListAll(): Promise<Domain[]> {
    return Promise.resolve(this.db.map((l) => this.fromPrimitives(l)));
  }

  update(data: Domain): Promise<void> {
    const listOverride = this.db.map((p) => {
      if(p.id === (data as any).id) return data as unknown as DomainProps
      return p
    });

    this.db = listOverride;
    localStorage.setItem(this.table, JSON.stringify(listOverride));
    return Promise.resolve();
  }

  create(data: Domain): Promise<void> {
    this.db.push(data as unknown as DomainProps);
    localStorage.setItem(this.table, JSON.stringify(this.db));
    return Promise.resolve();
  }

  delete(id: string): Promise<void> {
    const listOverride = this.db.filter((p) => p.id !== id);
    this.db = listOverride;
    localStorage.setItem(this.table, JSON.stringify(listOverride));
    return Promise.resolve();
  }
}
