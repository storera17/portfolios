# NFL Expansion Optimization

This project uses binary integer programming to evaluate potential NFL expansion locations across a network of candidate cities. The model treats cities as nodes in a coverage graph and selects the smallest feasible set of franchise locations that can cover the candidate market network while satisfying demographic, economic, geographic, and budget constraints.

## Project Objective

The goal is to support strategic expansion planning by comparing where future NFL franchises could be placed under different feasibility assumptions. The model balances market quality, geographic coverage, and capital requirements.

## Methods

- Candidate city filtering using population, demographic, economic, and feasibility criteria
- Great-circle distance calculations using the Haversine formula
- Binary decision variables for selected franchise locations
- Minimum dominating set style coverage formulation
- Budget and feasibility constraints
- Threshold sensitivity analysis across population and economic criteria

## Repository Contents

```text
.
|-- README.md
|-- nfl_modeling.ipynb
`-- data
    |-- cities.csv
    |-- theta_lambda_best_solution .csv
    `-- theta_lambda_sensitivity.csv
```

## Data Files

| File | Description |
| --- | --- |
| [`data/cities.csv`](data/cities.csv) | Candidate city dataset with city identifiers, coordinates, budget estimates, feasibility flags, and segmentation fields. |
| [`data/theta_lambda_sensitivity.csv`](data/theta_lambda_sensitivity.csv) | Threshold sweep results showing feasible and infeasible population/economic combinations. |
| [`data/theta_lambda_best_solution .csv`](data/theta_lambda_best_solution%20.csv) | Final modeled solution by city, including candidate-set membership and selected-site indicators. |

## Key Results

The included results show:

- 174 modeled city markets
- 71 selected franchise locations in feasible scenarios
- 4 feasible threshold combinations
- 12 threshold combinations where full coverage is impossible
- Approximate selected-site cost of `$337.1B` for feasible runs

| Population Threshold | Economic Threshold | Candidate Cities | Selected Cities |
| ---: | ---: | ---: | ---: |
| 1 | 1 | 174 | 71 |
| 1 | 2 | 173 | 71 |
| 2 | 1 | 173 | 71 |
| 2 | 2 | 173 | 71 |

When either threshold rises to 3 or 4, the filtered candidate set can no longer cover the full network under the 150-mile coverage radius assumption.

## Requirements

The notebook uses Python 3 and the following core packages:

- pandas
- NumPy
- gurobipy
- matplotlib
- cartopy
- adjustText

Gurobi requires a valid local installation and license.

## How to Review

Open [`nfl_modeling.ipynb`](nfl_modeling.ipynb) to review the full optimization workflow. The included CSV files allow reviewers to inspect the input data, threshold sensitivity results, and final modeled solution without rerunning the optimization model.

## Reproducibility Notes

The notebook may require local path updates before rerunning. If rerunning the model, update the notebook path settings so they point to this project folder or the `data` folder.
