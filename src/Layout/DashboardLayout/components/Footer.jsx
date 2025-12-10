import React from 'react'

const Footer = () => {
    return (
        <footer className="dashboard-footer p-4 text-center text-sm" style={{ backgroundColor: '#f9f7fc', borderTop: '1px solid #dcd3e4', color: '#4c4452' }}>
            Copyright © {new Date().getFullYear()} TailorFlow Inc. All rights reserved.
        </footer>
    )
}
export default Footer
