import React, {useState} from "react";
import {connect} from 'react-redux';
import Result from "./Result";
import * as actions from './../redux/action';
import Card from './Card';
import LoadingIndicator from "./LoadingIndicator";
import './search.css';

export const Search = (props) => {
    // console.log("props is:" , props)
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
        return <Result repos={repos} pullRequests={pullRequests} userName={username}/>;
    };

    const isFetchingRepos = repos.isFetching;
    const isFetchingPRs = pullRequests.isFetching;
    // const fetchReposSuccess = !isFetchingRepos && !repos.error && Object.keys(repos.data).length > 0;
    const fetchReposSuccess = !isFetchingRepos && Object.keys(repos.data).length > 0;
    // const fetchingPRsSuccess = !isFetchingPRs && !pullRequests.error && Object.keys(pullRequests.data).length > 0;
    const fetchingPRsSuccess = !isFetchingPRs && Object.keys(pullRequests.data).length > 0;
    // const fetchRepos = !fetchReposSuccess;
    // const fetchPRs = !fetchingPRsSuccess;

    return (
        <div>
            {/* {(fetchRepos || fetchPRs) && searchUser()} */}
            {/* {fetchRepos || fetchPRs ? searchUser() : displayResult(repos.data, pullRequests.data)} */}

            {fetchReposSuccess || fetchingPRsSuccess ? displayResult(repos.data, pullRequests.data) : searchUser()}

            {/* {fetchReposSuccess && fetchingPRsSuccess && displayResult(repos.data, pullRequests.data)} */}
            {/* {fetchReposSuccess && fetchingPRsSuccess ? displayResult(repos.data, pullRequests.data): null} */}
            {/* {(isFetchingRepos || isFetchingPRs) && <LoadingIndicator/>} */}
            {(isFetchingRepos || isFetchingPRs) ? <LoadingIndicator /> : null}
        </div>
    );
};

const mapStateToProps = (state) => {
    return state;
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchForkedRepos: (full_name) => dispatch(actions.fetchForkedRepos(full_name)),
        fetchPullRequests: (full_name) => dispatch(actions.fetchPullRequests(full_name))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
