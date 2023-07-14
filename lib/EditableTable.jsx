"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = __importStar(require("react"));
const styles_1 = require("@mui/material/styles");
const Box_1 = __importDefault(require("@mui/material/Box"));
const Table_1 = __importDefault(require("@mui/material/Table"));
const TableBody_1 = __importDefault(require("@mui/material/TableBody"));
const TableCell_1 = __importDefault(require("@mui/material/TableCell"));
const TableContainer_1 = __importDefault(require("@mui/material/TableContainer"));
const TableHead_1 = __importDefault(require("@mui/material/TableHead"));
const TablePagination_1 = __importDefault(require("@mui/material/TablePagination"));
const TableRow_1 = __importDefault(require("@mui/material/TableRow"));
const TableSortLabel_1 = __importDefault(require("@mui/material/TableSortLabel"));
const Toolbar_1 = __importDefault(require("@mui/material/Toolbar"));
const Typography_1 = __importDefault(require("@mui/material/Typography"));
const Paper_1 = __importDefault(require("@mui/material/Paper"));
const Checkbox_1 = __importDefault(require("@mui/material/Checkbox"));
const IconButton_1 = __importDefault(require("@mui/material/IconButton"));
const Tooltip_1 = __importDefault(require("@mui/material/Tooltip"));
const utils_1 = require("@mui/utils");
const Edit_1 = __importDefault(require("@mui/icons-material/Edit"));
const Delete_1 = __importDefault(require("@mui/icons-material/Delete"));
const Save_1 = __importDefault(require("@mui/icons-material/Save"));
const base_1 = require("@mui/base");
const material_1 = require("@mui/material");
const AlertDialog_1 = __importDefault(require("./AlertDialog"));
const LanguageProvider_1 = require("./LanguageProvider");
function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}
function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}
const headCells = [
    {
        id: "translationKey",
        label: "language-editor:editor-table-translation-key-column-title",
    },
    {
        id: "translationValue",
        label: "language-editor:editor-table-translation-value-column-title",
    },
];
function EnhancedTableHead(props) {
    const { t } = (0, LanguageProvider_1.useLanguageProvider)();
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };
    return (<TableHead_1.default>
      <TableRow_1.default sx={{
            background: (theme) => theme.palette.primary.light,
        }}>
        <TableCell_1.default padding="checkbox">
          <Checkbox_1.default color="primary" indeterminate={numSelected > 0 && numSelected < rowCount} checked={rowCount > 0 && numSelected === rowCount} onChange={onSelectAllClick} inputProps={{
            "aria-label": "Select all translations",
        }}/>
        </TableCell_1.default>
        {headCells.map((headCell) => (<TableCell_1.default key={headCell.id} sortDirection={orderBy === headCell.id ? order : false} align="left">
            <TableSortLabel_1.default active={orderBy === headCell.id} direction={orderBy === headCell.id ? order : "asc"} onClick={createSortHandler(headCell.id)}>
              {t(headCell.label)}
              {orderBy === headCell.id ? (<Box_1.default component="span" sx={utils_1.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box_1.default>) : null}
            </TableSortLabel_1.default>
          </TableCell_1.default>))}
      </TableRow_1.default>
    </TableHead_1.default>);
}
function EnhancedTableToolbar(props) {
    const { selected, onDelete } = props;
    const [openDialog, setOpenDialog] = React.useState(false);
    const { t } = (0, LanguageProvider_1.useLanguageProvider)();
    return (<Toolbar_1.default sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(selected.length > 0 && {
                bgcolor: (theme) => (0, styles_1.alpha)(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
        }}>
      {selected.length > 0 ? (<Typography_1.default sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
          {selected.length} {t('language-editor:editor-table-selected-items-word')}
        </Typography_1.default>) : (<Typography_1.default sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
          {t("language-editor:editor-table-header")}
        </Typography_1.default>)}
      {selected.length > 0 && (<Tooltip_1.default title="Delete">
          <IconButton_1.default>
            <Delete_1.default onClick={() => setOpenDialog(true)}/>
          </IconButton_1.default>
        </Tooltip_1.default>)}
      <AlertDialog_1.default open={openDialog} setOpen={setOpenDialog} cancelText={t('language-editor:editor-table-delete-dialog-cancel-button')} confirmText={t('language-editor:editor-table-delete-dialog-confirm-button')} content={t("language-editor:editor-table-delete-dialog-content")} title={t("language-editor:editor-table-delete-dialog-title")} onConfirm={() => onDelete(selected)}/>
    </Toolbar_1.default>);
}
function EditableCell({ valueKey, value, onSave, }) {
    const [state, setState] = React.useState(value);
    const [edit, setEdit] = React.useState(false);
    const handleEdit = () => {
        setEdit(!edit);
        if (!edit)
            return;
        onSave(valueKey, state);
    };
    return (<base_1.FormControl>
      <material_1.OutlinedInput id={`input-${valueKey}`} disabled={!edit} type="text" size="small" value={state} onChange={(e) => setState(e.target.value)} onKeyDown={(e) => {
            if (e.key === "Enter")
                handleEdit();
        }} fullWidth endAdornment={<material_1.InputAdornment position="end">
            <IconButton_1.default onClick={handleEdit} edge="end">
              {edit ? (<Save_1.default sx={{
                    color: (theme) => theme.palette.success.light,
                    ":hover": { color: (theme) => theme.palette.success.main },
                }}/>) : (<Edit_1.default sx={{
                    color: (theme) => theme.palette.primary.light,
                    ":hover": { color: (theme) => theme.palette.primary.main },
                }}/>)}
            </IconButton_1.default>
          </material_1.InputAdornment>}/>
    </base_1.FormControl>);
}
function EditableTable({ defaultRowPerPage, language, namespace, data, onSave, onDelete }) {
    const { t } = (0, LanguageProvider_1.useLanguageProvider)();
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("translationKey");
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowPerPage);
    const handleRequestSort = (_, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };
    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = data.map((d) => d.translationKey);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };
    const handleClick = (_, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        }
        else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        }
        else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }
        setSelected(newSelected);
    };
    const handleChangePage = (_, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const isSelected = (name) => selected.indexOf(name) !== -1;
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;
    const visibleRows = React.useMemo(() => stableSort(data, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage), [order, orderBy, page, rowsPerPage, data]);
    return (<Box_1.default sx={{ width: "100%" }}>
      <Paper_1.default sx={{ width: "100%", mb: 2 }}>
        <EnhancedTableToolbar selected={selected} onDelete={onDelete}/>
        <TableContainer_1.default>
          <Table_1.default sx={{ minWidth: 750 }} size={"medium"}>
            <EnhancedTableHead numSelected={selected.length} order={order} orderBy={orderBy} onSelectAllClick={handleSelectAllClick} onRequestSort={handleRequestSort} rowCount={data.length}/>
            <TableBody_1.default>
              {visibleRows.map((row, index) => {
            const isItemSelected = isSelected(row.translationKey);
            const labelId = `enhanced-table-checkbox-${index}`;
            return (<TableRow_1.default hover role="checkbox" aria-checked={isItemSelected} tabIndex={-1} key={language + ":" + namespace + ":" + row.translationKey + ":" + row.translationValue} selected={isItemSelected} sx={{ cursor: "pointer" }}>
                    <TableCell_1.default padding="checkbox">
                      <Checkbox_1.default onClick={(event) => handleClick(event, row.translationKey)} color="primary" checked={isItemSelected} inputProps={{
                    "aria-labelledby": labelId,
                }}/>
                    </TableCell_1.default>
                    <TableCell_1.default align="left">{row.translationKey}</TableCell_1.default>
                    <TableCell_1.default align="left">
                      <EditableCell valueKey={row.translationKey} value={row.translationValue} onSave={onSave}/>
                    </TableCell_1.default>
                  </TableRow_1.default>);
        })}
              {emptyRows > 0 && (<TableRow_1.default style={{
                height: 33 * emptyRows,
            }}>
                  <TableCell_1.default colSpan={6}/>
                </TableRow_1.default>)}
            </TableBody_1.default>
          </Table_1.default>
        </TableContainer_1.default>
        <TablePagination_1.default rowsPerPageOptions={[5, 10, 15, 20, 25, 50, 100]} component="div" count={data.length} rowsPerPage={rowsPerPage} labelRowsPerPage={t("language-editor:editor-table-label-rows-per-page")} page={page} onPageChange={handleChangePage} onRowsPerPageChange={handleChangeRowsPerPage}/>
      </Paper_1.default>
    </Box_1.default>);
}
exports.default = EditableTable;
