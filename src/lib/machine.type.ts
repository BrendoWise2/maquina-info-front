
export interface MachineProps {
    id: string;
    name: string;
    sector: string;
    qrcode: string;
    image: string;
    model: string;
    manuals: {
        id: string;
        title: string;
        file_url: string;
        description: string;
        machineId: string;
    }[];
    motors: {
        id: string;
        name: string;
        power: string;
        description: string;
        manufacturer: string;
        image: string;
        codsap: string;
        machineId: string;
    }[];
    pumps: {
        id: string;
        name: string;
        type: string;
        description: string;
        manufacturer: string;
        image: string;
        codsap: string;
        machineId: string;
    }[];
    inspections: {
        id: string;
        machineId: string;
        userId: string;
    }[];
    encoders: {
        id: string;
        name: string;
        local: string;
        codsap: string;
        image: string;
        machineId: string;
    }[];
    fusos: {
        id: string;
        name: string;
        power: string;
        description: string;
        manufacturer: string;
        image: string;
        codsap: string;
        machineId: string;
    }[];

}