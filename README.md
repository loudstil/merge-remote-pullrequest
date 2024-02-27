# Create Remote Pull Request

This Action merge the first (and only) PR from a specific branch

## Inputs

- `owner` (required): Owner of the target repository.
- `repo` (required): Name of the target repository.
- `branch` (required): Branch to create the pull request from.
- `token` (optional): token 

## Example Usage

```yaml
name: Merge Pull Request

on:
  push:
    branches:
      - main

jobs:
  create-pr-job:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Merge Pull Request Action
        uses: ./merge-remote-pullrequest@main
        with:
          owner: 'your-target-repo-owner'
          repo: 'your-target-repo-name'
          branch: 'feature-branch'
