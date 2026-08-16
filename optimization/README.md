# NFL Expansion Optimization Portfolio

This project uses binary integer programming to study where future NFL franchises could be placed across a network of candidate cities. The model treats each city as a node in a coverage graph and searches for the smallest set of selected franchise locations that can cover all viable markets while satisfying demographic, economic, geographic, and budget constraints.

The main analysis is contained in `nfl_modeling.ipynb`. It combines a written project report, data preprocessing, a Gurobi optimization model, threshold sensitivity analysis, and map-based visualization of selected expansion sites.

## Project Goal

The model frames NFL expansion as a constrained minimum dominating set problem:

- Candidate cities are filtered using population/demographic criteria and economic/value criteria.
- Pairwise city coverage is determined using great-circle distance.
- A binary decision variable indicates whether a city is selected for a franchise.
- The objective minimizes the number of selected cities needed to cover the full candidate network.
- Constraints enforce feasibility filters, market coverage, budget limits, and optional market separation rules.

This structure is useful for comparing expansion scenarios where the league must balance market quality, geographic coverage, and capital requirements.

## Repository Contents

```text
.
├── README.md
├── nfl_modeling.ipynb
└── data
    ├── cities.csv
    ├── theta_lambda_sensitivity.csv
    └── theta_lambda_best_solution .csv
```

## Data Files

`data/cities.csv` is the source city dataset. It includes city names, IDs, coordinates, estimated budget/cost values, population filter flags, economic filter flags, geographic feasibility flags, and segmentation fields.

`data/theta_lambda_sensitivity.csv` stores the threshold sweep results. Each row reports one population-threshold and economic-threshold combination, the number of eligible candidate cities, solver status, selected city count, total cost, and selected city IDs.

`data/theta_lambda_best_solution .csv` stores the modeled solution by city. It contains the cleaned numeric coordinate and budget fields, candidate-set membership, segmentation, and a `selected` flag indicating whether each city appears in the final solution. Note that this filename currently contains a space before `.csv`.

## Model Summary

The notebook implements the following workflow:

1. Load and clean the city dataset.
2. Convert coordinate and currency fields into numeric values.
3. Detect population filter columns and economic filter columns.
4. Build a distance-based adjacency matrix using the Haversine formula.
5. Run a Gurobi binary integer programming model for each tested threshold pair.
6. Save sensitivity results and the best solution.
7. Generate a coverage map showing selected cities and covered markets.

Important notebook settings include:

- Coverage radius: `150` miles
- Global budget factor: `0.75` times the sum of candidate city costs
- Solver time limit: `30` seconds per run
- Population threshold sweep: `1, 2, 3, 4`
- Economic threshold sweep: `1, 2, 3, 4`

## Key Results

The included solution files show:

- 174 modeled city markets
- 71 selected franchise locations in the feasible solutions
- 4 feasible threshold combinations
- 12 threshold combinations where coverage is impossible
- Total selected-site cost of approximately `$337.1B` for the feasible runs

The feasible threshold combinations are:

| Population threshold | Economic threshold | Candidate cities | Selected cities |
| --- | --- | ---: | ---: |
| 1 | 1 | 174 | 71 |
| 1 | 2 | 173 | 71 |
| 2 | 1 | 173 | 71 |
| 2 | 2 | 173 | 71 |

When either threshold rises to 3 or 4, the filtered candidate set can no longer cover the full network under the 150-mile radius assumption.

## Requirements

The notebook uses Python 3 and the following main packages:

- `pandas`
- `numpy`
- `gurobipy`
- `matplotlib`
- `cartopy`
- `adjustText`

Gurobi requires a working installation and license. Academic licenses are available from Gurobi for eligible users.

## Running the Notebook

Open `nfl_modeling.ipynb` in Jupyter Notebook, JupyterLab, or VS Code.

Before running the model, update the `ROOT_DRIVE` setting in the notebook so it points to this project folder or directly to the `data` folder. The notebook currently uses an absolute path from the original author environment.

For this local copy, either of these patterns will work:

```python
ROOT_DRIVE = "/Users/andystorer/Desktop/optimization_portfolio"
```

or:

```python
ROOT_DRIVE = "/Users/andystorer/Desktop/optimization_portfolio/data"
```

If `ROOT_DRIVE` points to the project root, the notebook will find `data/cities.csv` recursively, but new output files will be written to the project root. If `ROOT_DRIVE` points to `data`, outputs will be written beside the existing CSV files.

## Expected Outputs

When the notebook runs successfully, it creates:

- `theta_lambda_sensitivity.csv`
- `theta_lambda_best_solution.csv`
- `nfl_expansion_coverage_map.png`

The current repository includes the sensitivity CSV and solution CSV under `data`. The generated coverage map is referenced by the notebook but is not currently included in this folder.

## Authors

Jake Borders, Henry Fladung, Astin Lin, Dhritik Manchaiah, James Sherman, and Andrew Storer.

