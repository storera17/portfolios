# **The Classification of Images Through CNNs and Transfer Learning**

## *Understanding the Problem*

The business objective of this project was to evaluate whether an automated image classification system can reliably distinguish between photos of pizza and steak. This type of capability is relevant to a range of food-related business applications, including menu photo organization, food delivery platform tagging, restaurant analytics, and content moderation. The central question guiding the analysis was which modeling approach provides the most useful and reliable classification system: a convolutional neural network built from scratch or a model that leverages transfer learning from a pre-trained architecture.

The primary stakeholders for this system are product and operations teams within food-related businesses who need to categorize or organize large volumes of food images efficiently. These teams benefit when the model is accurate, consistent, and fast enough to support automated workflows without requiring constant human review.

Incorrect predictions carry real operational consequences. A false positive occurs when the model incorrectly labels a steak image as pizza, or vice versa. In a food delivery context, this could mean a dish is miscategorized on a menu, leading to a poor customer experience or an incorrect order. In a content moderation or analytics context, miscategorized images could distort reporting or surface irrelevant content to users. While neither error type carries safety implications, both erode trust in the automated system and increase the burden on human reviewers.

From a business perspective, success means a model that classifies food images correctly at a high enough rate to be deployed with minimal human oversight, generalizes well to new images it has not seen before, and produces results that are consistent and predictable across different operating conditions. The model should also be practical to maintain and update as the image library grows.

## *Data Preparation*

The dataset used in this project consisted of labeled food images organized into two categories: pizza and steak. The training set contained 750 images per class for a total of 1,500 training images, and the test set contained 250 images per class for a total of 500 held-out evaluation images. The class balance across both splits ensured that neither category dominated the training signal, which simplifies evaluation and makes accuracy a reliable measure of performance.

Before training, all images were resized to 224 by 224 pixels. This size was chosen because the pre-trained EfficientNetB0 model was originally trained on images of this resolution, and using the same size allows for a fair comparison between the two models. Pixel values for the scratch CNN were scaled from their original range of 0 to 255 down to a range of 0 to 1. This normalization step stabilizes the gradient updates during training and speeds up convergence. The transfer learning model used its own internal preprocessing function rather than this manual rescaling step, which is an important distinction explained further in the modeling section.

Data augmentation was applied to the training set only. This included random horizontal flips, small rotations up to 15 degrees, zoom adjustments, and minor horizontal and vertical shifts. Augmentation exposes the model to varied presentations of the same food items during training, which helps it generalize better to new images. The test set received no augmentation, ensuring that evaluation results reflect real-world performance rather than artificially favorable conditions.

## *Modeling Breakdown*

Two models were built and trained for this analysis. The first was a convolutional neural network constructed from scratch. The second used transfer learning from EfficientNetB0, a pre-trained architecture originally trained on over one million images across one thousand categories. The key difference between the two approaches is that the scratch model must learn all useful visual features from the 750 available training images, while the transfer learning model arrives pre-equipped with the ability to recognize edges, textures, shapes, and objects, and only needs to adapt that knowledge to the specific task of distinguishing pizza from steak.

### CNN Built from Scratch

The scratch model was organized into three convolutional blocks, each following a pattern of a convolutional layer, batch normalization, a ReLU activation function, and max pooling. The convolutional layers progressively increased in filter depth from 32 to 64 to 128, allowing the model to detect increasingly complex features at each stage. After the three blocks, a global average pooling layer condensed the spatial feature maps into a single vector, which was passed through a 128-unit dense layer with dropout regularization before a final output layer using a sigmoid activation for binary classification.

The model was compiled with binary cross-entropy loss, which is the standard loss function for two-class classification problems, and trained using the Adam optimizer with an initial learning rate of 0.001. Training ran for up to 30 epochs with two callbacks in place. Early stopping halted training if validation loss did not improve for five consecutive epochs, and a learning rate scheduler halved the learning rate if validation loss stalled for three epochs. These choices were designed to prevent overfitting while still allowing the model enough time to converge on a good solution.

### Transfer Learning Model: EfficientNetB0

EfficientNetB0 was selected as the base model for the transfer learning approach because it offers strong performance with a relatively small parameter count of approximately 5.3 million parameters, making it well-suited to the hardware and dataset size used in this project. Larger alternatives such as VGG16 and ResNet50 carry parameter counts of 138 million and 25 million respectively, which would be excessive for a binary classification task with 1,500 training images.

Training was split into two phases. In the first phase, all EfficientNetB0 layers were frozen and only the custom classifier head was trained for up to 10 epochs. This allowed the model to learn how to map the existing ImageNet features to the pizza and steak categories without disturbing the pre-trained weights. In the second phase, the top 20 layers of EfficientNetB0 were unfrozen and the entire model was fine-tuned at a very low learning rate of 0.00001, allowing the higher-level features to adapt more specifically to food imagery.

A critical technical distinction in the data pipeline was that EfficientNetB0 requires its own internal preprocessing rather than the standard pixel rescaling used for the scratch model. Providing rescaled images to EfficientNetB0 would corrupt the learned representations in the frozen layers and cause training to fail entirely. Separate data pipelines were maintained for the two models to ensure each received inputs in the format it expected.

## *Evaluation and Comparison*

Both models were evaluated on the held-out test set of 500 images. The table below summarizes the key performance metrics.

**Table 1.** Test set performance comparison between the scratch CNN and EfficientNetB0 transfer learning model.

| Model | Test Accuracy | Test Loss | Misclassifications |
| --- | ---: | ---: | ---: |
| CNN from Scratch | 89.4% | 0.2646 | 53 out of 500 |
| EfficientNetB0 TL | 99.4% | 0.0229 | 3 out of 500 |

The EfficientNetB0 transfer learning model substantially outperformed the scratch CNN across every metric. It achieved 99.4% accuracy on the test set compared to 89.4% for the scratch model, misclassifying only 3 images out of 500. The classification report confirmed that the transfer learning model reached precision and recall of 0.99 or higher for both classes, while the scratch model showed more variation across classes with precision and recall values in the range of 0.84 to 0.95.

The training curves also revealed an important behavioral difference between the two models. The scratch CNN showed high volatility in validation accuracy across epochs, with values bouncing between 50% and 89% before stabilizing. This instability is a known characteristic of models trained on small datasets, where any individual batch can meaningfully shift the validation result. The EfficientNetB0 model, by contrast, reached 99.6% validation accuracy in its very first epoch and remained stable throughout both phases of training. This consistency is a meaningful advantage in a production setting, where predictable and reliable behavior is as important as raw accuracy.

The confusion matrices reinforced these findings. The scratch model correctly classified 237 pizza images and 210 steak images, with 13 pizza images incorrectly predicted as steak and 40 steak images incorrectly predicted as pizza. The transfer learning model correctly classified 247 pizza images and all 250 steak images, with only 3 pizza images misclassified. The near-perfect performance of the transfer learning model on the steak class in particular suggests that EfficientNetB0 had already learned robust features for distinguishing meat textures from its ImageNet training.

## *Error Analysis and Limitations*

Because the EfficientNetB0 model misclassified only 3 out of 500 images, the error analysis focuses primarily on those three cases and what they suggest about the boundaries of the model. All three misclassifications were pizza images predicted as steak. Visual inspection of these images revealed that they shared characteristics that reduced the distinguishing visual cues the model typically relies on. Common factors included unusual lighting conditions, heavily shadowed or dark compositions, and close-up framings that obscured the circular shape and toppings that typically identify a pizza image.

Several broader limitations should be considered when interpreting these results. First, the dataset is relatively small with 750 training images per class, and while the transfer learning model handled this well, the scratch model showed clear signs of instability that would likely persist if the class distribution were to shift or if more visually ambiguous images were introduced. Second, the binary nature of this task means that the model has no concept of uncertainty across multiple food categories. In a real deployment with dozens of food types, accuracy on this two-class task would not necessarily translate directly. Third, the test set was drawn from the same source distribution as the training data. Performance on images from different cameras, lighting conditions, or geographic contexts may differ from what was observed here.

For deployment purposes, one practical mitigation is to apply a confidence threshold. Rather than auto-labeling every image, the system could flag predictions where the model output probability is close to 0.5 as uncertain and route those images to a human reviewer. Given that the transfer learning model produced only 3 errors, this threshold-based approach would require minimal manual review while preserving near-perfect accuracy on the images the model handles automatically.

## *Final Executive Recommendation*

After testing two image classification approaches on a dataset of pizza and steak photos, the transfer learning model built on EfficientNetB0 is the clear recommendation for business deployment. It correctly identified 497 out of 500 test images for an accuracy of 99.4%, compared to 89.4% for the custom-built model trained from scratch. Beyond raw accuracy, the transfer learning model trained faster, converged more reliably, and made far fewer mistakes, only 3 misclassifications versus 53 for the scratch model.

The practical case for the transfer learning model is straightforward. It leverages a neural network already trained on over a million images, meaning it arrives pre-equipped with the ability to recognize edges, textures, and shapes before ever seeing a single food photo. This makes it both more accurate and more efficient than building a model from the ground up on a small dataset. For a business deploying this in a real application such as menu photo organization or food delivery categorization, the transfer learning model offers a level of reliability that is production-ready, with the added option of flagging the rare uncertain prediction for human review rather than auto-labeling it.
