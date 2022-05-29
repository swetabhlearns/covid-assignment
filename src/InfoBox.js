import { Card, CardContent, Typography } from '@mui/material'
import React from 'react'

function InfoBox({title, cases,total}) {
  return (
<Card  className='infoBox'>
    <CardContent>
        <Typography className='infoBox_title' color = 'rgb(182 57 57 / 87%);'>
            {title}
        </Typography>
        <h2 className='infoBox_cases' color ='rgb(182 57 57 / 87%)'>Today:  {cases}</h2>
        <Typography className='infoBox_total'  color = 'textSecondary'>
        Total: {total}
        </Typography>
    </CardContent>

</Card>
  )
}
    
export default InfoBox