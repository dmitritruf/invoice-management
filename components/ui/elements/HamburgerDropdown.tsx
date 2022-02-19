import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import Hamburger from './Hamburger'

export type HamburgerDropdownItem = {
    label: string,
    type: string,
}

export type HamburgerDropdownProps = {
    items: HamburgerDropdownItem[]
}

type DisplayState = [string, { (display: any): void }]

const HamburgetDropdownItemPropTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
}

const HamburgerDropdownPropTypes = {
    items: PropTypes.arrayOf(PropTypes.exact(HamburgetDropdownItemPropTypes))
}

const HamburgerDropdown = ({ items = [] }: HamburgerDropdownProps) => {
    const [display, setDisplay]: DisplayState = useState('none');
    const clickHandler = useCallback(() => {
        setDisplay((display: any) => display == 'none' ? '' : 'none')
    }, [])

    if (items.length === 0) {
        return null;
    }

    return (
        <>
            <div className="text-lg text-center relative">
                <Hamburger onClick={clickHandler} />
                <div style={{ display }} className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                    <div className="py-1" role="none">
                        {items.map(item => 
                            <a key={item.type} href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id="menu-item-0">{item.label}</a>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

HamburgerDropdown.propTypes = HamburgerDropdownPropTypes

export default HamburgerDropdown