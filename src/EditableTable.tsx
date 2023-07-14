import * as React from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { visuallyHidden } from "@mui/utils";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import { FormControl } from "@mui/base";
import { InputAdornment, OutlinedInput } from "@mui/material";
import AlertDialog from "./AlertDialog";
import { useLanguageProvider } from "./LanguageProvider";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export type Translation = "translationKey" | "translationValue";

interface HeadCell {
  id: Translation;
  label: string;
}

const headCells: readonly HeadCell[] = [
  {
    id: "translationKey",
    label: "language-editor:editor-table-translation-key-column-title",
  },
  {
    id: "translationValue",
    label: "language-editor:editor-table-translation-value-column-title",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: Translation) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { t } = useLanguageProvider();
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property: Translation) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow
        sx={{
          background: (theme) => theme.palette.primary.light,
        }}
      >
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "Select all translations",
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.id} sortDirection={orderBy === headCell.id ? order : false} align="left">
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {t!(headCell.label)}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  selected: string[];
  onDelete: (keys: string[]) => void;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { selected, onDelete } = props;
  const [openDialog, setOpenDialog] = React.useState(false);
  const { t } = useLanguageProvider();

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(selected.length > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {selected.length > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
          {selected.length} {t!('language-editor:editor-table-selected-items-word')}
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
          {t!("language-editor:editor-table-header")}
        </Typography>
      )}
      {selected.length > 0 && (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon onClick={() => setOpenDialog(true)} />
          </IconButton>
        </Tooltip>
      )}
      <AlertDialog
        open={openDialog}
        setOpen={setOpenDialog}
        cancelText={t!('language-editor:editor-table-delete-dialog-cancel-button')}
        confirmText={t!('language-editor:editor-table-delete-dialog-confirm-button')}
        content={t!("language-editor:editor-table-delete-dialog-content")}
        title={t!("language-editor:editor-table-delete-dialog-title")}
        onConfirm={() => onDelete(selected)}
      />
    </Toolbar>
  );
}

function EditableCell({
  valueKey,
  value,
  onSave,
}: {
  valueKey: string;
  value: string;
  onSave: (key: string, value: string) => void;
}) {
  const [state, setState] = React.useState(value);
  const [edit, setEdit] = React.useState(false);

  const handleEdit = () => {
    setEdit(!edit);
    if (!edit) return;
    onSave(valueKey, state);
  };

  return (
    <FormControl>
      <OutlinedInput
        id={`input-${valueKey}`}
        disabled={!edit}
        type="text"
        size="small"
        value={state}
        onChange={(e) => setState(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleEdit();
        }}
        fullWidth
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleEdit} edge="end">
              {edit ? (
                <SaveIcon
                  sx={{
                    color: (theme) => theme.palette.success.light,
                    ":hover": { color: (theme) => theme.palette.success.main },
                  }}
                />
              ) : (
                <EditIcon
                  sx={{
                    color: (theme) => theme.palette.primary.light,
                    ":hover": { color: (theme) => theme.palette.primary.main },
                  }}
                />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}

export interface EditableTableProps {
  defaultRowPerPage: number;
  language: string;
  namespace: string;
  data: any;
  onSave: (key: string, value: string) => void;
  onDelete: (keys: string[]) => void;
}

export default function EditableTable({ defaultRowPerPage, language, namespace, data, onSave, onDelete }: EditableTableProps) {
  const { t } = useLanguageProvider();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<Translation>("translationKey");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowPerPage);

  const handleRequestSort = (_:any, property: Translation) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = data.map((d: any) => d.translationKey);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (_:any, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const handleChangePage = (_:any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const visibleRows = React.useMemo(
    () => stableSort(data, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, data]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar selected={selected} onDelete={onDelete} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size={"medium"}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={data.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.translationKey as string);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={language + ":" + namespace + ":" + row.translationKey as string + ":" + row.translationValue as string}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        onClick={(event) => handleClick(event, row.translationKey as string)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">{row.translationKey}</TableCell>
                    <TableCell align="left">
                      <EditableCell
                        valueKey={row.translationKey as string}
                        value={row.translationValue as string}
                        onSave={onSave}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          labelRowsPerPage={t!("language-editor:editor-table-label-rows-per-page")}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
