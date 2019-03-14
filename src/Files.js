import React from 'react';
import PropTypes, { any } from 'prop-types';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Button } from 'react-bootstrap';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import TextField from '@material-ui/core/TextField';

let counter = 0;
function createData(name, type, datemodified, size) {
  counter += 1;
  return { id: counter, name, type, datemodified, size };
}

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'datemodified', numeric: false, disablePadding: false, label: 'Date Modified' },
  { id: 'size', numeric: false, disablePadding: false, label: 'Size' },
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(
            row => (
              <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            ),
            this,
          )}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class Files extends React.Component {
  state = {
    order: 'asc',
    orderBy: 'names',
    selected: [],
    filterData: [
      createData('Zips', 'Directory', "5/10/2018 17:39:27", "6 KB"),
      createData('Presets', 'files', "5/10/2018 17:39:27", "6 KB"),
      createData('Workflow', 'Directory', "5/10/2018 17:39:27", "6 KB"),
      createData('Software', 'Directory', "5/10/2018 17:39:27", "6 KB"),
      createData('nmm_data', 'Directory', "5/10/2018 17:39:27", "10 KB"),
      createData('jobs', 'Directory', "5/10/2018 17:39:27", "16 KB")],
    data: [
      createData('Zips', 'Directory', "5/10/2018 17:39:27", "6 KB"),
      createData('Presets', 'files', "5/10/2018 17:39:27", "6 KB"),
      createData('Workflow', 'Directory', "5/10/2018 17:39:27", "6 KB"),
      createData('Software', 'Directory', "5/10/2018 17:39:27", "6 KB"),
      createData('nmm_data', 'Directory', "5/10/2018 17:39:27", "10 KB"),
      createData('jobs', 'Directory', "5/10/2018 17:39:27", "16 KB")
    ],
    page: 0,
    rowsPerPage: 6,
    query: '',
    columnToQuery: "name"
  };

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.setState({ order, orderBy });
  };
  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };
  handleChangePage = (event, page) => {
    this.setState({ page });
  };
  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };
  isSelected = id => this.state.selected.indexOf(id) !== -1;
  handleChangeSearch = name => event => {
    let searchText = event.target.value;
    console.log(event.target.value +".....Search" +this.state.data);
    let filter;
    if (searchText != undefined) {
      if (!this.state.data)  this.state.filterData = [];
      if (!searchText)  this.state.filterData = this.state.data;
      searchText = searchText.toLowerCase();
      filter = this.state.data.filter(i => {
        return (
          i.name.toLowerCase().includes(searchText) ||
          i.type.toLowerCase().includes(searchText) ||
          i.datemodified.toLowerCase().includes(searchText) ||
          i.size.toLowerCase().includes(searchText)
        );
      });      
    } else {
      this.state.filterData = this.state.data;
    }
    this.setState({ filterData: filter });
  };

  render() {
    const { classes } = this.props;
    const { filterData, order, orderBy, selected, page } = this.state;
    return (   
        <div className="innerWrapper">        
        <h5>Files</h5>
      <div className="card p-10 bx-shdow">
        <div className="breadcrumWrapper">
          <Breadcrumb>
            <Breadcrumb.Item href="#">Root</Breadcrumb.Item>
            <Breadcrumb.Item active>
              Files
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div>
          <Button className="m-r-15" variant=""><Icon className="f-lft m-r-5 icn-clr">add_circle</Icon>New Directory</Button>
          <Button className="m-r-15" variant=""><Icon className="f-lft m-r-5 icn-clr">cloud_upload</Icon>Upload</Button>
          <TextField
          id="freeTextSearch"
          label="Search Record"
          className="custom-input"
          value={this.state.searchValue}
          onChange={this.handleChangeSearch()}
          margin=""
        />
        </div>
      </div>
      <div>
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={filterData.length}
            />
            <TableBody>
              {stableSort(filterData, getSorting(order, orderBy))
                .map(n => {
                  return (
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox />
                      </TableCell>
                      <TableCell padding="none">
                        <Icon className="f-lft m-r-5 icn-clr icn-clr-fldr">folder</Icon>{n.name}
                      </TableCell>
                      <TableCell align="left">{n.type}</TableCell>
                      <TableCell align="left">{n.datemodified}</TableCell>
                      <TableCell align="left">{n.size}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        </Paper>
        </div>
        </div>
    );
  }
}
Files.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Files);