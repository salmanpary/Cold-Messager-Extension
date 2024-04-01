import { useState } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect({options, onOptionSelect}) {
    const [limit, setLimit] = useState(options[0]);

    const handleChange = (event) => {
        setLimit(event.target.value);
        onOptionSelect(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 60 }}>
            <FormControl fullWidth>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={limit}
                    onChange={handleChange}
                    sx={{ width: '100%', p: 1, height: 'auto', margin: '12%' }} // Adjust width and padding
                >
                    {options.map((option) => (
                        <MenuItem key={option} value={option}>{option}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
