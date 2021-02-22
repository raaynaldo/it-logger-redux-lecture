import { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getTechs } from 'actions/techActions';

const TechSelectOption = ({ tech: { techs, loading }, getTechs }) => {
    useEffect(() => {
        getTechs();
        // eslint-disable-next-line
    }, []);

    return (
        !loading &&
        tech?.map((t) => (
            <option value={`${t.firstName} ${t.lastName}`} key={t.id}>
                {t.firstName} {t.lastName}
            </option>
        ))
    );
};
TechSelectOption.propTypes = {
    tech: PropTypes.object.isRequired,
    getTechs: PropTypes.func.isRequired,
};

export default connect(null, { getTechs })(TechSelectOption);
