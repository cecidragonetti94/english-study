import PropTypes from 'prop-types'
import ArrowUpOnSquareIcon from '@heroicons/react/24/solid/ArrowUpOnSquareIcon'
import PlusIcon from '@heroicons/react/24/solid/PlusIcon'
import FilterIcon from '@heroicons/react/24/outline/FunnelIcon'
import { Button, Fab, Stack, SvgIcon, Typography, Tooltip } from '@mui/material'
import { useMediaQuery, useTheme } from '@mui/material';

function SectionHeader({
  title,
  showAddButton,
  onClickAddButton,
  showImport,
  onClickImport,
  customAction,
  onClickFilterButton,
  filtersCount,
}) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Stack direction="row" justifyContent="space-between" spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">{title}</Typography>
        <Stack alignItems="center" direction="row" spacing={1}>
          {showImport && (
            <Button
              color="inherit"
              size='small'
              startIcon={
                <SvgIcon fontSize="small">
                  <ArrowUpOnSquareIcon />
                </SvgIcon>
              }
              onClick={onClickImport}
            >
              Import
            </Button>
          )}
        </Stack>
        {customAction}
      </Stack>
      <Stack direction="row" spacing={2}>
        {onClickFilterButton && (
          <Button
            size='small'
            startIcon={
              <SvgIcon fontSize="small">
                <FilterIcon />
              </SvgIcon>
            }
            variant="text"
            onClick={onClickFilterButton}
          >
            {t('filters', { count: filtersCount })}
          </Button>
        )}

        {showAddButton && (
          <Stack >
            {isSmallScreen ? (
              <Fab
                color="primary"
                aria-label="add"
                sx={{ position: 'fixed', bottom: 16, right: 16 }}
                onClick={onClickAddButton}
              >
                <SvgIcon fontSize="medium">
                  <PlusIcon />
                </SvgIcon>
              </Fab>
            ) : (
              <Tooltip title="Agregar">
                <Button
                  size='small'
                  startIcon={
                    <SvgIcon fontSize="small">
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="outlined"
                  onClick={onClickAddButton}
                >
                  Add
                </Button>
              </Tooltip>
            )}
          </Stack>
        )}

      </Stack>
    </Stack>
  )
}

SectionHeader.defaultProps = {
  showAddButton: false,
  showImport: false,
  showExport: false,
  onClickAddButton: () => null,
  onClickImport: () => null,
  onClickFilterButton: null,
  filtersCount: 0,
  addPermissions: undefined,
  customAction: null,
}

SectionHeader.propTypes = {
  title: PropTypes.string,
  showAddButton: PropTypes.bool,
  addPermissions: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  showExport: PropTypes.bool,
  showImport: PropTypes.bool,
  onClickAddButton: PropTypes.func,
  onClickImport: PropTypes.func,
  customAction: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
  onClickFilterButton: PropTypes.func,
  filtersCount: PropTypes.number,
}

export default SectionHeader
