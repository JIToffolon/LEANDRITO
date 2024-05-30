import React, { useContext } from 'react'
import { Fab, Badge } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import { dataContext } from '../Context/DataContext';

const FloatingCartIcon = () => {
    const {cartItemCount} = useContext(dataContext);
    const styles = {
        position:'fixed',
        bottom:'20px',
        right:'20px'
    }

  return (
    <>
        <Fab color='' aria-label='cart' style={styles}>
            <Badge badgeContent={cartItemCount} color=''>
                <ShoppingCart/>
            </Badge>
        </Fab>
    
    </>
  )
}

export default FloatingCartIcon