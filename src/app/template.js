'use client'
import { motion } from 'framer-motion'

import React from 'react'

export default function Template({children}) {
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.75, ease: 'easeInOut' }}>
        {children}
     </motion.div> 
  )
}