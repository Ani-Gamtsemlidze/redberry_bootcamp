import * as React from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useUpload } from "../../../context/UploadBlogContext";

import CloseIcon from "@mui/icons-material/Close";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
let catArray = [
  { id: 1, title: "მარკეტი", background_color: "#FFBB2F" },
  { id: 2, title: "აპლიკაცია", background_color: "#1CD67D" },
  { id: 3, title: "ხელოვნური ინტელექტი", background_color: "#B11CD6" },
  { id: 4, title: "UI/UX", background_color: "#FA5757" },
  { id: 5, title: "კვლევა", background_color: "#70CF25" },
  { id: 6, title: "Figma", background_color: "#08D2AE" },
  { id: 7, title: "დამზადება", background_color: "#08D2AE" },
  { id: 8, title: "კოპიუტერული მეცნიერება", background_color: "#70CF25" },
  { id: 9, title: "სამუშაო გარემო", background_color: "#1CD67D" },
  { id: 10, title: "მუსიკა", background_color: "#08D2AE" },
  { id: 11, title: "სპორტი", background_color: "#FA5757" },
  { id: 12, title: "სამშენებლო", background_color: "#B11CD6" },
  { id: 13, title: "სამედიცინო", background_color: "#FFBB2F" },
  { id: 14, title: "სხვა", background_color: "#FA5757" },
];

let CatId = JSON.parse(localStorage.getItem("form_values"))?.category_input;
let filteredCategories = catArray.filter((category) =>
  CatId.includes(category.id)
);

// Extract titles from filteredCategories
let titles = filteredCategories.map((category) => category.title);

export default function MultipleSelectChip({ selectArray, label }) {
  const { handleInputChange } = useUpload();
  const [listName, setListName] = React.useState(titles || []);

  const handleChange = (e) => {
    handleInputChange(e);
    const {
      target: { value },
    } = e;

    setListName(typeof value === "string" ? value.split(",") : value);
  };

  const handleDelete = (e, value) => {
    e.preventDefault();
    const deleteData = listName.filter((item) => {
      return item !== value;
    });

    setListName(deleteData);

    let filteredCategories = catArray.filter((category) =>
      deleteData.includes(category.title)
    );

    // Extract IDs from filteredCategories
    let ids = filteredCategories.map((category) => category.id);

    let storedFormValues =
      JSON.parse(localStorage.getItem("form_values")) || {};

    storedFormValues.category_input = JSON.stringify(ids);

    localStorage.setItem("form_values", JSON.stringify(storedFormValues));
  };

  const bgArray = () => {
    const getBackgroundColors = (names, data) => {
      return names.map((name) => {
        const foundItem = data.find((item) => item.title === name);
        return foundItem ? foundItem.background_color : null;
      });
    };

    const backgroundColors = getBackgroundColors(listName, catArray);

    return backgroundColors;
  };

  return (
    <div>
      <label htmlFor="input">{label} </label>
      <FormControl>
        <InputLabel id="demo-multiple-chip-label">კატეგორია</InputLabel>
        <Select
          className="upload_select"
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={listName}
          onChange={handleChange}
          inputProps={{ name: "category_input" }}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value, index) => (
                <>
                  <Chip
                    key={index}
                    label={value}
                    clickable
                    style={{ backgroundColor: bgArray()[index], color: "#fff" }}
                    deleteIcon={
                      <CloseIcon
                        onMouseDown={(event) => event.stopPropagation()}
                      />
                    }
                    onDelete={(e) => handleDelete(e, value)}
                  />
                </>
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {selectArray.data?.map((name) => (
            <MenuItem
              key={name.id}
              value={name.title}
              className="select_list"
              style={{
                backgroundColor: name.background_color,
                color: name.text_color,
              }}
            >
              {name.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
