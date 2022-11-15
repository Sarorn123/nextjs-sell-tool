import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useEffect } from "react";
import moment from 'moment';

type Props = {
  setDate: any;
};

export default function DatePickers({ setDate }: Props) {
  const [value, setValue] = React.useState("");

  useEffect(() => {
    setDate(value);
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disableFuture
        label="Pick A Date"
        openTo="month"
        views={["year", "month", "day"]}
        value={value}
        onChange={(newValue: any) => {
          setValue(newValue);
        }}
        renderInput={(params: any) => <TextField {...params} />}
        className="w-full"
      />
    </LocalizationProvider>
  );
}
