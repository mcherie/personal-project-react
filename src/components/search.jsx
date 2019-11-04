import React, {useState} from "react";
import {connect} from 'react-redux';
import Result from "./Result";
import * as actions from './../redux/action';
import Card from './Card';
import LoadingIndicator from "./LoadingIndicator";
import './search.css';

export const Search = (props) => {
    const [username, setUsername] = useState("venomvendor");
    const {repos, pullRequests} = props;

    const submitHandler = (event) => {
        event.preventDefault(); // to prevent form from submitting to default and do below instead
        props.fetchForkedRepos(username);
        props.fetchPullRequests(username);
    };

    const searchUser = () => {
        return (
            <section className="search">
                <Card className="search-card">
                    <form onSubmit={submitHandler}>
                        <p>Github Username:</p>
                        <input value={username} className="user-input" onChange={e => setUsername(e.target.value)}/>
                        <button
                            type="submit"
                            className="submit-btn"
                            disabled={!username.length}
                        >
                            GET USER
                        </button>
                    </form>
                </Card>
            </section>
        );
    };

    const displayResult = (repos, pullRequests) => {
        debugger;
        return <Result repos={repos} pullRequests={pullRequests} userName={username}/>;
    };

    const isFetchingRepos = repos.isFetching;
    const isFetchingPRs = pullRequests.isFetching;
    const fetchReposSuccess = !isFetchingRepos && Object.keys(repos.data).length > 0;
    const fetchingPRsSuccess = !isFetchingPRs && Object.keys(pullRequests.data).length > 0;

    return (
        <div>
            {fetchReposSuccess && fetchingPRsSuccess ? displayResult(repos.data, pullRequests.data) : searchUser()}
            {(isFetchingRepos || isFetchingPRs) ? <LoadingIndicator /> : null}
        </div>
    );
};

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchForkedRepos: (username) => dispatch(actions.fetchForkedRepos(username)),
        fetchPullRequests: (username) => dispatch(actions.fetchPullRequests(username))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
