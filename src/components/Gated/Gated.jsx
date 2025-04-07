import PropTypes from 'prop-types'
import NotFound from '../../pages/Errors/screens/NotFound'
const Gated = ({ children, permissions, forbiddenElement }) => {
  const { checkPermissions } = useAuth()

  if (!checkPermissions(permissions)) {
    return forbiddenElement
  }

  return children
}

Gated.defaultProps = {
  permissions: 'yes',
  forbiddenElement: <NotFound status='300'/>,
}

Gated.propTypes = {
  permissions: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]).isRequired,
}

export default Gated
