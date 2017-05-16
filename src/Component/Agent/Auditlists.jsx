import axios from 'axios';
import Pendinglists from './Pendinglists';


class Auditlists extends Pendinglists {
  fetch() {
    this.setState({ loading: true });
    axios.get('api/get/player/editor')
    .then((response) => {
      this.setState({
        data: response,
      });
    });
  }
}

export default Auditlists;
