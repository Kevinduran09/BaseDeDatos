import React from 'react'
import { Grid } from '@mui/material'
import { FormControl } from '@mui/material'
import { InputLabel } from '@mui/material'
import { Input } from '@mui/material'
import { Box } from '@mui/material'
export const ClientForm = () => {
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormControl variant="standard" sx={{width:'100%'}}>
                        <InputLabel htmlFor="component-simple">Name</InputLabel>
                        <Input id="component-simple" />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="component-simple">Name</InputLabel>
                        <Input id="component-simple" />
                    </FormControl>
                </Grid>
                <Grid item>
                    <FormControl variant="standard">
                        <InputLabel htmlFor="component-simple">Name</InputLabel>
                        <Input id="component-simple" />
                    </FormControl>
                </Grid>
            </Grid>

        </>
    )
}
