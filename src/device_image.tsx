import React from 'react';
export interface Device {
    id: number;
    title: string;
    filename: string;
}
export function DeviceImage(device: Device) {
    return (
        <img src={device.filename} alt={device.filename} />
    );
}
