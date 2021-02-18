import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import LogItem from './LogItem';
import propTypes from 'prop-types';
import Preloader from '../layout/Preloader';

const Logs = ({ log: { logs, loading } }) => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getLogs();
        // eslint-disable-next-line
    }, []);

    const getLogs = async () => {
        setLoading(true);
        const res = await fetch('/logs');
        const data = await res.json();

        setLogs(data);
        setLoading(false);
    };

    if (loading) {
        return <Preloader />;
    }

    return (
        <div>
            <ul className='collection with-header'>
                <li className='collection-header'>
                    <h4 className='center'>System Logs</h4>
                </li>
                {!loading && logs.length === 0 ? (
                    <p className='center'>No logs to show...</p>
                ) : (
                    logs.map((log, key) => <LogItem key={key} log={log} />)
                )}
            </ul>
        </div>
    );
};

Logs.propTypes = {
    log: propTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    log: state.log,
});

export default connect(mapStateToProps)(Logs);
