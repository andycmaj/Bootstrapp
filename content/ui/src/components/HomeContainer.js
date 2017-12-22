import { connect } from 'react-redux';
import Home from './Home';
import { get } from '../actions/values';
import { compose, lifecycle } from 'recompose';

const mapStateToProps = ({ values }) => ({ values });
const mapDispatchToProps = { get };

const HomeContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  lifecycle({
    componentDidMount() {
      this.props.get();
    }
  }),
)(Home);

export default HomeContainer;
