import { chunk, worksheet } from './schema.mjs';

/** Worksheets derived from ISA 634 linear programming, integer programming, network flow, and Gurobi material. */
export const OPTIMIZATION_WORKSHEETS = [
  worksheet({
    id: 'isa634-linear-programming-gurobi',
    title: 'Linear Programming with Gurobi',
    language: 'python',
    difficulty: 2,
    topics: ['optimization', 'linear programming', 'Gurobi', 'constraints'],
    sourceRefs: [
      'Classes /Fall 2025/ISA 634/9-9-25/gurobi_lp_ip_sensitivity.py',
      'Classes /Fall 2025/ISA 634/9-11-25/gurobi_lp_ip_sensitivity (1).py',
      'Classes /Fall 2025/ISA 634/9-9-25/The Diet Problem.docx',
    ],
    chunks: [
      chunk({
        id: 'lp-01',
        title: 'Import Gurobi and create a model',
        prompt: 'Import gurobipy as gp, import GRB, and create a model named model.',
        solution: 'import gurobipy as gp\nfrom gurobipy import GRB\n\nmodel = gp.Model("product_mix")',
        hints: ['Most Gurobi examples use gp as the alias.', 'GRB stores constants such as MAXIMIZE.'],
      }),
      chunk({
        id: 'lp-02',
        title: 'Add decision variables',
        prompt: 'Create nonnegative variables x and y for two products.',
        solution: 'x = model.addVar(lb=0, name="x")\ny = model.addVar(lb=0, name="y")',
        hints: ['lb=0 means nonnegative.', 'Name variables so output is readable.'],
      }),
      chunk({
        id: 'lp-03',
        title: 'Add resource constraints',
        prompt: 'Add constraints: 2x + y <= 100 and x + 3y <= 120.',
        solution: 'model.addConstr(2 * x + y <= 100, name="labor")\nmodel.addConstr(x + 3 * y <= 120, name="materials")',
        hints: ['Each constraint gets addConstr().', 'Names help interpret shadow prices and diagnostics.'],
      }),
      chunk({
        id: 'lp-04',
        title: 'Set objective and solve',
        prompt: 'Maximize 40x + 50y and optimize the model.',
        solution: 'model.setObjective(40 * x + 50 * y, GRB.MAXIMIZE)\nmodel.optimize()',
        hints: ['Use GRB.MAXIMIZE for a maximization problem.', 'Call optimize() after variables, constraints, and objective exist.'],
      }),
    ],
  }),
  worksheet({
    id: 'isa634-assignment-network-flow',
    title: 'Transportation and Assignment Model Pattern',
    language: 'python',
    difficulty: 3,
    topics: ['optimization', 'transportation', 'assignment', 'network flow'],
    sourceRefs: [
      'Classes /Fall 2025/ISA 634/10-9-2025/05 - Transportation & Assignment Problems.pdf',
      'Classes /Fall 2025/ISA 634/10-9-2025/06 - Network Flow Problems.pdf',
      'Classes /Fall 2025/ISA 634/Exam 2/Topic 1. Transportation and Assignment Problems/05 - Transportation & Assignment Problems (1).pdf',
    ],
    chunks: [
      chunk({
        id: 'flow-01',
        title: 'Define supply, demand, and costs',
        prompt: 'Create dictionaries for supply, demand, and shipping cost keyed by origin/destination.',
        solution: 'supply = {"A": 80, "B": 65}\ndemand = {"X": 70, "Y": 75}\ncost = {("A", "X"): 4, ("A", "Y"): 7, ("B", "X"): 6, ("B", "Y"): 3}',
        hints: ['Costs are keyed by (origin, destination).', 'Use small dictionaries first; scale later.'],
      }),
      chunk({
        id: 'flow-02',
        title: 'Create shipment variables',
        prompt: 'Create one nonnegative decision variable for every origin-destination pair.',
        solution: 'ship = model.addVars(cost.keys(), lb=0, name="ship")',
        hints: ['addVars can take the cost keys directly.', 'Each variable represents flow on an arc.'],
      }),
      chunk({
        id: 'flow-03',
        title: 'Add supply constraints',
        prompt: 'For each origin, ensure total outbound shipments do not exceed supply.',
        solution: 'for i in supply:\n    model.addConstr(gp.quicksum(ship[i, j] for j in demand) <= supply[i], name=f"supply_{i}")',
        hints: ['Loop over origins.', 'Sum all destinations for each origin.'],
      }),
      chunk({
        id: 'flow-04',
        title: 'Add demand constraints and objective',
        prompt: 'Meet each destination demand and minimize total shipping cost.',
        solution: 'for j in demand:\n    model.addConstr(gp.quicksum(ship[i, j] for i in supply) >= demand[j], name=f"demand_{j}")\n\nmodel.setObjective(gp.quicksum(cost[i, j] * ship[i, j] for i, j in cost), GRB.MINIMIZE)\nmodel.optimize()',
        hints: ['Demand sums inbound shipments.', 'The objective multiplies cost by flow.'],
      }),
    ],
  }),
];
