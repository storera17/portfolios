import { chunk, worksheet } from './schema.mjs';

/** Worksheets derived from ISA 630 matrix algebra, gradients, neural networks, CNNs, RNNs, SVMs, and ensembles. */
export const DEEP_LEARNING_WORKSHEETS = [
  worksheet({
    id: 'isa630-gradient-descent-numpy',
    title: 'Gradient Descent from Scratch',
    language: 'python',
    difficulty: 2,
    topics: ['NumPy', 'loss functions', 'gradients', 'gradient descent'],
    sourceRefs: [
      'Classes /Spring 2026/ISA 630/Module 1_ [Gradients, Regularization]/[1] Learning, Loss Functions, Cost Functions, Gradients /Loss, Cost, and Gradients.ipynb',
      'Classes /Spring 2026/ISA 630/Module 1_ [Gradients, Regularization]/[3] Gradient Descent Algorithm/Gradient_Descent_Algorithm.ipynb',
      'Literature to Know/DB, BI, & Analytics/ML/d2l-en.pdf',
    ],
    chunks: [
      chunk({
        id: 'gd-01',
        title: 'Import NumPy and set training data',
        prompt: 'Import numpy and create arrays X and y for a tiny linear regression example.',
        solution: 'import numpy as np\n\nX = np.array([1, 2, 3, 4], dtype=float)\ny = np.array([3, 5, 7, 9], dtype=float)',
        hints: ['Use dtype=float so gradient math is smooth.', 'This data follows roughly y = 2x + 1.'],
      }),
      chunk({
        id: 'gd-02',
        title: 'Initialize parameters',
        prompt: 'Initialize weight w, bias b, and learning_rate.',
        solution: 'w = 0.0\nb = 0.0\nlearning_rate = 0.01',
        hints: ['Start with simple scalar parameters.', 'The learning rate controls step size.'],
      }),
      chunk({
        id: 'gd-03',
        title: 'Compute predictions and mean squared error',
        prompt: 'Calculate predictions and the mean squared error loss.',
        solution: 'preds = w * X + b\nloss = np.mean((preds - y) ** 2)',
        hints: ['Linear prediction is w * X + b.', 'Mean squared error averages squared residuals.'],
      }),
      chunk({
        id: 'gd-04',
        title: 'Take one gradient descent step',
        prompt: 'Compute gradients for w and b, then update both parameters.',
        solution: 'dw = np.mean(2 * (preds - y) * X)\ndb = np.mean(2 * (preds - y))\n\nw = w - learning_rate * dw\nb = b - learning_rate * db',
        hints: ['Gradients point uphill; subtract them to reduce loss.', 'The bias gradient does not multiply by X.'],
      }),
    ],
  }),
  worksheet({
    id: 'isa630-cnn-keras-skeleton',
    title: 'CNN Image Classifier Skeleton',
    language: 'python',
    difficulty: 3,
    topics: ['deep learning', 'CNN', 'Keras', 'image classification'],
    sourceRefs: [
      'Classes /Spring 2026/ISA 630/Module 5_ [Convolution Neural Networks]/[3] Convolution Neural Networks/CNN_Implementation_worksheet.ipynb',
      'Classes /Spring 2026/ISA 630/Module 5_ [Convolution Neural Networks]/[18] Introduction_to_CNNs.ipynb',
      'Classes /Spring 2026/ISA 630/Projects/project 3/pizza_vs_steak.ipynb',
    ],
    chunks: [
      chunk({
        id: 'cnn-01',
        title: 'Import Keras building blocks',
        prompt: 'Import Sequential, Conv2D, MaxPooling2D, Flatten, and Dense.',
        solution: 'from tensorflow.keras.models import Sequential\nfrom tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense',
        hints: ['CNN layers live under tensorflow.keras.layers.', 'Sequential is enough for a first image classifier.'],
      }),
      chunk({
        id: 'cnn-02',
        title: 'Start the model with a convolution block',
        prompt: 'Create a Sequential model with a Conv2D layer and MaxPooling2D layer for 64x64 RGB images.',
        solution: 'model = Sequential([\n    Conv2D(32, (3, 3), activation="relu", input_shape=(64, 64, 3)),\n    MaxPooling2D((2, 2)),\n])',
        hints: ['RGB images have 3 channels.', 'Pooling reduces spatial size.'],
      }),
      chunk({
        id: 'cnn-03',
        title: 'Add dense classification layers',
        prompt: 'Flatten the convolution output and add a hidden Dense layer plus a sigmoid output layer.',
        solution: 'model.add(Flatten())\nmodel.add(Dense(64, activation="relu"))\nmodel.add(Dense(1, activation="sigmoid"))',
        hints: ['Sigmoid is for binary classification.', 'Flatten bridges convolution layers to dense layers.'],
      }),
      chunk({
        id: 'cnn-04',
        title: 'Compile the classifier',
        prompt: 'Compile the model for binary classification using Adam and accuracy.',
        solution: 'model.compile(optimizer="adam", loss="binary_crossentropy", metrics=["accuracy"])',
        hints: ['binary_crossentropy matches a sigmoid output.', 'accuracy is an easy first metric, not the only metric.'],
      }),
    ],
  }),
  worksheet({
    id: 'isa630-rnn-sequence-windowing',
    title: 'Sequence Windowing for RNNs',
    language: 'python',
    difficulty: 2,
    topics: ['RNN', 'LSTM', 'sequence data', 'time series'],
    sourceRefs: [
      'Classes /Spring 2026/ISA 630/Module 6_ [Recurrent Neural Networks]/sequence.ipynb',
      'Classes /Spring 2026/ISA 630/Module 6_ [Recurrent Neural Networks]/lstm.ipynb',
      'Classes /Spring 2026/ISA 630/Module 6_ [Recurrent Neural Networks]/bitcoin_closing_price_forecasting_homework.ipynb',
    ],
    chunks: [
      chunk({
        id: 'rnn-01',
        title: 'Create a numeric series',
        prompt: 'Import numpy and create a simple array named series.',
        solution: 'import numpy as np\n\nseries = np.array([10, 12, 13, 15, 18, 21, 23, 25, 28, 30], dtype=float)',
        hints: ['A sequence is ordered.', 'dtype=float is useful for scaling/modeling.'],
      }),
      chunk({
        id: 'rnn-02',
        title: 'Set window and horizon',
        prompt: 'Set window_size to 3 and horizon to 1.',
        solution: 'window_size = 3\nhorizon = 1',
        hints: ['Window size is how much history the model sees.', 'Horizon is how far ahead it predicts.'],
      }),
      chunk({
        id: 'rnn-03',
        title: 'Build input/output windows',
        prompt: 'Loop through the series and build X windows with matching y next-step values.',
        solution: 'X, y = [], []\nfor i in range(len(series) - window_size - horizon + 1):\n    X.append(series[i:i + window_size])\n    y.append(series[i + window_size + horizon - 1])',
        hints: ['Each X row is a slice of prior values.', 'The y value is the future target after the window.'],
      }),
      chunk({
        id: 'rnn-04',
        title: 'Convert windows into model arrays',
        prompt: 'Convert X and y to NumPy arrays and reshape X for an RNN with one feature.',
        solution: 'X = np.array(X).reshape(-1, window_size, 1)\ny = np.array(y)',
        hints: ['RNN input shape is samples x timesteps x features.', 'Here there is one feature per timestep.'],
      }),
    ],
  }),
];
