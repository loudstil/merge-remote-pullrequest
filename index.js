const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const owner = core.getInput('owner');
    const repoName = core.getInput('repo');
    const branchName = core.getInput('branch');

    const token = core.getInput('token') || github.token;
    const octokit = github.getOctokit(token);

    // find pull request
    const pullRequestResponse = await octokit.rest.pulls.list({
      owner: owner,
      repo: repoName,
      head: branchName,
      state: 'open'
    });

    const pullRequestNumber = pullRequestResponse.data[0].number;
    console.log(`Pull request # ${pullRequestNumber}`);
    
    const pullRequestMergeResponse = await octokit.rest.pulls.merge({
      owner: owner,
      repo: repoName,
      pull_number: pullRequestNumber
    });

    console.log(`Pull request # ${pullRequestNumber} merged: ${pullRequestMergeResponse.data.merged}`);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
