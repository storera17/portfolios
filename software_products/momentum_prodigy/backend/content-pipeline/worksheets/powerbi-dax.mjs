import { chunk, worksheet } from './schema.mjs';

/** Worksheets derived from ISA 512 Power BI, DAX, modeling, and dashboard material. */
export const POWERBI_DAX_WORKSHEETS = [
  worksheet({
    id: 'isa512-dax-filter-context',
    title: 'DAX Filter Context and Safe Measures',
    language: 'dax',
    difficulty: 2,
    topics: ['Power BI', 'DAX', 'filter context', 'CALCULATE', 'ALLSELECTED'],
    sourceRefs: [
      'Classes /Fall 2025/ISA 512/ISA 512/Module 1 - Data Preparation using DAX Query Language/M1.3 Table Functions in DAX/03 Ignore filters.pbix',
      'Classes /Fall 2025/ISA 512/ISA 512/Module 1 - Data Preparation using DAX Query Language/M1.3 Table Functions in DAX/07b ALLSELECTED.pbix',
      'Classes /Fall 2025/ISA 512/ISA 512/Module 1 - Data Preparation using DAX Query Language/M1.4 Evaluation Contexts/1.4.b row and filter contexts (demo).pbix',
    ],
    chunks: [
      chunk({
        id: 'dax-filter-01',
        title: 'Create the base revenue measure',
        prompt: 'Write a reusable measure named Total Revenue that sums Sales[Revenue].',
        solution: 'Total Revenue = SUM(Sales[Revenue])',
        hints: ['Measures should aggregate columns.', 'Use SUM around the numeric revenue column.'],
      }),
      chunk({
        id: 'dax-filter-02',
        title: 'Ignore product filters',
        prompt: 'Create Revenue All Products by recalculating Total Revenue while removing filters from Product.',
        solution: 'Revenue All Products = CALCULATE([Total Revenue], ALL(Product))',
        hints: ['CALCULATE changes filter context.', 'ALL(Product) removes filters from the Product table.'],
      }),
      chunk({
        id: 'dax-filter-03',
        title: 'Respect report selections',
        prompt: 'Create Revenue Selected Products so the denominator respects slicers but ignores the current visual row.',
        solution: 'Revenue Selected Products = CALCULATE([Total Revenue], ALLSELECTED(Product))',
        hints: ['ALLSELECTED keeps outer report selections.', 'This is useful for visual percentages.'],
      }),
      chunk({
        id: 'dax-filter-04',
        title: 'Compute share of selected revenue',
        prompt: 'Create Product Revenue Share using DIVIDE so blank or zero denominators do not break the report.',
        solution: 'Product Revenue Share = DIVIDE([Total Revenue], [Revenue Selected Products])',
        hints: ['DIVIDE is safer than /.', 'Use the selected-products denominator from the previous chunk.'],
      }),
    ],
  }),
  worksheet({
    id: 'isa512-star-schema-date-modeling',
    title: 'Star Schema and Date Relationships',
    language: 'dax',
    difficulty: 3,
    topics: ['Power BI', 'star schema', 'date table', 'USERELATIONSHIP', 'grain'],
    sourceRefs: [
      'Classes /Fall 2025/ISA 512/ISA 512/Module 2 - Data Modeling using Power BI/M2.3 Building a Star Scheme/2.3.b - header and detail (begin).pbix',
      'Classes /Fall 2025/ISA 512/ISA 512/Module 2 - Data Modeling using Power BI/M2.4 Working with Time and Date/2.4.c - Multiple relationship with date.pbix',
      'Literature to Know/DB, BI, & Analytics/The Data Warehouse Toolkit - Kimball.pdf',
    ],
    chunks: [
      chunk({
        id: 'dax-star-01',
        title: 'Declare an order-date sales measure',
        prompt: 'Write Total Sales using the active OrderDate relationship.',
        solution: 'Total Sales = SUM(Sales[SalesAmount])',
        hints: ['The active relationship handles OrderDate automatically.', 'Start with the simplest measure.'],
      }),
      chunk({
        id: 'dax-star-02',
        title: 'Activate the ship-date relationship',
        prompt: 'Write Sales by Ship Date using USERELATIONSHIP between Date[Date] and Sales[ShipDate].',
        solution: 'Sales by Ship Date = CALCULATE([Total Sales], USERELATIONSHIP(Date[Date], Sales[ShipDate]))',
        hints: ['USERELATIONSHIP is used inside CALCULATE.', 'The inactive relationship is temporarily activated for this measure.'],
      }),
      chunk({
        id: 'dax-star-03',
        title: 'Create a distinct customer count',
        prompt: 'Write a measure that counts unique customers at the fact-table grain.',
        solution: 'Customers = DISTINCTCOUNT(Sales[CustomerKey])',
        hints: ['Use DISTINCTCOUNT for unique customer keys.', 'Do not count rows unless each row is exactly one customer.'],
      }),
      chunk({
        id: 'dax-star-04',
        title: 'Calculate revenue per customer',
        prompt: 'Write Revenue per Customer using your Total Sales and Customers measures.',
        solution: 'Revenue per Customer = DIVIDE([Total Sales], [Customers])',
        hints: ['Use DIVIDE for safe ratios.', 'Measures can reuse other measures.'],
      }),
    ],
  }),
];
