interface Passenger {
    name: string,
    children?: string[];
}

const passenger1: Passenger = {
    name: "Fernando",
}
const passenger2: Passenger = {
    name: "Melissa",
    children: ["Natalia", "Elizabeth"],
}

const returnChildren = ({name, children}: Passenger): number => {
    const howManyChildren = children?.length || 0;
    // const howManyChildren = children!.length;

    console.log(name, howManyChildren);

    return howManyChildren;
}


returnChildren(passenger2);