export const isType = (component: any, types: {name: string}[]): boolean => {
    let type = component.type ? component.type.name : component.type;
    let typeNames = types.map(type => type.name)
    return typeNames.some(name => name === type);
}

export const segregate = (children:any[], rules:any[]):any[] => {
    const result:any[][] = (new Array(rules.length)).fill(1).map(x => [])
    const remaining:any[] = []
    children.forEach(child => {
        let added = rules.some((types: {name: string}[]|{name: string}, idx: number) => {
            if (isType(child, Array.isArray(types) ? types : [types])) {
                result[idx].push(child)
                return true
            }
            return false
        })
        if (!added) remaining.push(child)
    });

    result.push(remaining)

    return result
}

export const randomItem = (items: Array<any>) => items[Math.floor(Math.random() * items.length)]
export const aCompany = (): string => randomItem(['Acme', 'Ibm', 'HP', 'Google', 'Ferry', 'Rempel', 'Sawayn'])
export const aName = (): string => randomItem(["Jane", "Anna", "Laura", "Loretta"])
export const aLastName = (): string => randomItem(["Smith", "Gomez", "Krombacher"])
export const anAmount = (minimum: number, maximum: number, center: number): number => parseInt(((Math.random() * (maximum - minimum) * ((center - minimum) / (maximum - minimum))) + minimum).toFixed(0))
export const aDate = (from: string, to: string): string => {
    let sFrom = (new Date(from)).getTime()
    let sTo = (new Date(to)).getTime()
    let date = new Date(anAmount(sFrom, sTo, (sFrom + sTo) / 2))
    return date.toISOString().substring(0, 10)
}
