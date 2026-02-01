import React, { useState } from 'react';
import type { DrawerProps, RadioChangeEvent } from 'antd';
import { Button, Drawer, Radio, Space } from 'antd';

export const DrawerFeature = () => {
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState<DrawerProps['placement']>('right');
    const [size, setSize] = useState(256);


    return (
        <>

            <Button type="primary" onClick={() => setOpen(true)}>
                Open Drawer
            </Button>
            <div>Current size: {size}px</div>
            <Drawer
                title="Resizable Drawer"
                placement={placement}
                onClose={() => setOpen(false)}
                open={open}
                key={placement}
                size={size}
                resizable={{
                    onResize: (newSize) => setSize(newSize),
                }}
            >
                <p>Drag the edge to resize the drawer</p>
                <p>Current size: {size}px</p>
            </Drawer>
        </>
    );
};