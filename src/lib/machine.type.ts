
export interface MachineProps {
    id: string;
    name: string;
    sector: string;
    qrcode: string;
    image: string;
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
        machineId: string;
    }[];
    pumps: {
        id: string;
        name: string;
        type: string;
        description: string;
        manufacturer: string;
        image: string;
        machineId: string;
    }[];
    inspection: {
        id: string;
        machineId: string;
        userId: string;
    }[];

}