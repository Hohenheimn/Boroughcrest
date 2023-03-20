import React, { useEffect, useRef, useState } from "react";
import { usePopper } from "react-popper";

type Props = {
    toRef: React.ReactNode;
    toPop: React.ReactNode;
    samewidth?: boolean;
    className: string;
    fixed?: boolean;
    rightPosition?: boolean;
};

// For Dynamic Positioning only, its your command to toggle it

export default function DynamicPopOver({
    toRef,
    toPop,
    samewidth,
    className,
    fixed,
    rightPosition,
}: Props) {
    const inputField = useRef<any>();
    const toPopOver = useRef<any>();

    const { styles, attributes } = usePopper(
        inputField.current,
        toPopOver.current,
        {
            placement: rightPosition ? "bottom-end" : "bottom-start",
            modifiers: [
                {
                    name: "offset",
                    options: {
                        offset: [0, 5],
                    },
                },
                {
                    name: "flip",
                    options: {
                        fallbackPlacements: rightPosition
                            ? ["top-end"]
                            : ["top-start"],
                    },
                },
            ],
        }
    );
    const refWidth = inputField?.current?.offsetWidth;
    const extendStyle = {
        ...styles.popper,
        width: `${refWidth}px`,
    };

    if (!fixed) {
        return (
            <>
                <div ref={inputField} className={className}>
                    {toRef}
                </div>

                <div
                    className="bg-white z-50 shadow-md"
                    ref={toPopOver}
                    style={samewidth ? extendStyle : styles.popper}
                    {...attributes.popper}
                >
                    {toPop}
                </div>
            </>
        );
    } else {
        return (
            <>
                <div ref={inputField} className={className + " relative "}>
                    {toRef}
                    <div
                        className=" fixed mt-2 z-50 bg-white"
                        style={{ width: `${samewidth ? refWidth : ""}px` }}
                    >
                        {toPop}
                    </div>
                </div>
            </>
        );
    }
}