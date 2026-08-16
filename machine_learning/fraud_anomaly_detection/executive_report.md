# **GOTCHA! The Autoencoder Anomaly Detection of Fraud**

## *Understanding the Problem*

Insurance fraud represents a persistent operational challenge for insurers. Fraudulent claims increase claim processing costs, distort pricing models, and ultimately raise premiums for legitimate policyholders. Detecting fraud is difficult because fraudulent claims are intentionally designed to resemble legitimate claims. In most datasets, confirmed fraud cases represent only a small portion of total claims, which makes traditional supervised modeling approaches less reliable due to severe class imbalance.

The dataset used in this analysis contains historical automobile insurance claim information with a variety of demographic, behavioral, and claim-related variables. After preprocessing and encoding, the dataset includes 110 variables representing policyholder characteristics, vehicle attributes, and claim conditions. These variables capture patterns that may indirectly signal suspicious activity, such as changes in policyholder information, vehicle age relative to claim timing, or inconsistencies between reported accident conditions and claim characteristics. Due to confirmed fraud, labels are limited and potentially incomplete, and unsupervised anomaly detection approach was selected. Instead of directly predicting fraud labels, the model learns the structure of normal claims and identifies claims that deviate from typical patterns.

An autoencoder neural network was chosen for this task. Autoencoders are particularly useful in fraud detection settings because they learn a compressed representation of normal observations and measure how well those observations can be reconstructed. Claims that differ substantially from the learned structure of legitimate claims produce larger reconstruction errors and are therefore flagged as potentially anomalous. The purpose of this project is to focus on using an autoencoder model to rank insurance claims according to their fraud risk. Furthermore, the goal is not to make definitive fraud classifications, but to produce a prioritized list of suspicious claims that investigators can review more efficiently.

## *Autoencoder Modeling Breakdown*

The analytical workflow begins with preprocessing the claim dataset to ensure that all variables are suitable for neural network modeling. Since the dataset contains encoded categorical variables and numerical values with different scales, the data was standardized prior to training. Standardization prevents variables with larger numeric ranges from dominating the reconstruction process during model training. Only non-fraudulent observations from the training dataset were used to train the autoencoder. This step is essential because the model must learn the structure of normal claims. Including fraudulent claims during training would reduce the model's ability to detect anomalies.

Table 1 summarizes the core architectural components of the autoencoder used in this study. The purpose of Table 1 is to explain how the neural network transforms the raw claim variables into a compressed representation that allows the model to detect anomalies. As shown in Table 1, the model consists of four primary components: the input layer, encoder, bottleneck layer, and decoder. Each component contributes to the model's ability to learn the underlying structure of legitimate insurance claims.

The input layer receives all encoded claim variables, meaning each claim enters the network as a high-dimensional vector containing approximately 110 features derived from the dataset. The encoder then progressively compresses the input information until it reaches the bottleneck layer, which represents the smallest latent representation of the claim. The dimensional compression described in Table 1 forces the model to retain only the most important structural relationships within the data. Because the network must compress a large number of variables into a smaller representation, the bottleneck layer described in Table 1 prevents the model from memorizing the training data and instead encourages it to learn general patterns of legitimate claims.

The decoder component described in Table 1 then attempts to reconstruct the original claim features from the compressed representation. When a claim follows the typical structural patterns of legitimate claims, the reconstruction closely matches the original input. When a claim deviates from those patterns, reconstruction error increases. Thus, the architectural structure outlined in Table 1 provides the mechanism that allows the model to identify unusual claims based on reconstruction accuracy.

**Table 1.** Explanation of the main components of a basic autoencoder with the exception of the latent space.

| Component | Explanation |
| --- | --- |
| Input Layer | The input layer receives the full set of claim features. Each observation is represented as a high-dimensional vector corresponding to the encoded variables in the dataset. |
| Encoder | The encoder progressively compresses the input information into a smaller latent representation. In the notebook implementation, hidden layers reduce dimensionality until the model reaches the bottleneck layer. The compression forces the model to capture the most essential relationships between variables. |
| Bottleneck Layer | The bottleneck is the smallest representation of the data within the network. At this stage the model has distilled the original claim record into a condensed set of learned features that describe the structure of normal claims. |
| Decoder | The decoder attempts to reconstruct the original claim variables from the compressed representation. If the input claim follows the same structure learned during training, the reconstruction will closely match the original data. If the claim deviates from the learned pattern, the reconstruction error will be larger. |

![Figure 1. Training reconstruction loss across epochs.](figures/figure-1-training-reconstruction-loss.png)

**Figure 1.** Training reconstruction loss across epochs.

Figure 1 presents the training history of the autoencoder by showing reconstruction loss across training epochs. The purpose of Figure 1 is to demonstrate how the model learns to accurately reconstruct normal claims over time. In Figure 1, the loss values decline steadily during the early training stages before gradually stabilizing, indicating that the model is converging toward an optimal representation of the data.

Figure 1 presents the training history of the autoencoder by displaying reconstruction loss across training epochs. The purpose of Figure 1 is to demonstrate how the neural network gradually learns to reconstruct legitimate insurance claims during the training process. As shown in Figure 1, reconstruction loss decreases steadily as training progresses, indicating that the model is successfully learning the structural relationships within the dataset.

At the beginning of training, the model produces a relatively large reconstruction error because the network weights are randomly initialized. In Figure 1, the training loss begins at approximately 0.95 mean squared error during the first epoch. As the model adjusts its weights through gradient descent, the reconstruction loss decreases rapidly during the early training epochs. By approximately the 20th epoch, the loss has already declined significantly, demonstrating that the model is capturing the dominant structural patterns of legitimate claims.

The stabilization of the loss curve later in training provides further confirmation that the model has converged. In Figure 1, the training loss stabilizes near approximately 0.37 mean squared error while the validation loss follows a very similar trend. The small gap between the two curves shown in Figure 1 indicates that the model generalizes well and does not exhibit strong signs of overfitting. The convergence behavior illustrated in Figure 1 therefore provides evidence that the autoencoder successfully learned a stable representation of normal claim behavior before being applied to fraud risk scoring.

## *Fraud Scoring Strategy*

After the autoencoder model was trained using normal claim patterns, reconstruction error was calculated for every claim in the dataset. Reconstruction error represents the difference between the original claim feature vector and the output reconstructed by the neural network. Claims that resemble patterns seen during training tend to produce small reconstruction errors, while claims that differ from those patterns produce larger reconstruction errors. Because of this behavior, reconstruction error can be interpreted as an anomaly score that reflects the likelihood that a claim contains unusual characteristics.

The ranked output of this scoring procedure is summarized in Table 2, which presents a sample of the highest-risk claims identified by the model. The purpose of Table 2 is to demonstrate how reconstruction error can be translated into a practical investigation priority list for fraud analysts. Each row in Table 2 represents a claim from the test dataset along with its reconstruction error value and its known fraud label.

The values shown in Table 2 illustrate the large variation in reconstruction errors across claims. For example, the claim with index 14022 produced the largest reconstruction error of approximately 9.25, which is substantially larger than the remaining values in the top-ranked group. Most of the other high-risk claims listed in Table 2 have reconstruction errors between approximately 1.9 and 2.9, indicating that the highest-ranked claim represents an extreme anomaly relative to the rest of the dataset.

The ranking mechanism illustrated in Table 2 provides a practical operational workflow for fraud detection teams. Instead of attempting to classify every claim as fraudulent or legitimate, the model produces a prioritized list of claims that appear most unusual relative to normal claims. By ordering claims according to reconstruction error, investigators can begin reviewing cases at the top of the ranking shown in Table 2, allowing investigative resources to be focused on claims that are most likely to warrant further examination.

**Table 2.** Structure of ranked claims by reconstruction error.

| Rank | Claim Index (original_index) | Reconstruction Error / Risk Score | Fraud Label (FraudFound_P) |
| ---: | ---: | ---: | ---: |
| 1 | 14022 | 9.254318 | 0 |
| 2 | 5712 | 2.947102 | 0 |
| 3 | 3416 | 2.915740 | 0 |
| 4 | 7160 | 2.840451 | 0 |
| 5 | 6456 | 2.806449 | 0 |
| 6 | 6193 | 2.441414 | 0 |
| 7 | 9152 | 2.396308 | 0 |
| 8 | 14657 | 2.048452 | 0 |
| 9 | 3537 | 1.940514 | 0 |
| 10 | 11231 | 1.918669 | 0 |

Higher values indicate greater deviation from normal claim behavior. This ranking system allows investigators to focus on a manageable subset of claims that are most likely to contain fraudulent activity. The ranked output file `ranked_test_claims_by_risk.csv` contains all test claims ordered by reconstruction error. A second dataset, `top_risk_claims_selected.csv`, contains the highest-risk subset of claims selected for investigation. Rather than replacing human review, this system acts as a decision support tool that directs investigative resources toward the claims most likely to require further scrutiny.

Rather than producing a strict binary classification, this approach generates a prioritized list of claims that can be used by investigators. For example, if an investigative team has the capacity to review 1,000 claims during a given period, the model can provide the top 1,000 claims with the highest reconstruction error scores. This ranking approach mirrors the operational workflow used by many fraud detection teams. The model does not replace human investigators but instead functions as a decision support tool that directs attention toward the most suspicious claims.

## *Evaluation*

The performance of the anomaly detection approach was evaluated by comparing the ranked reconstruction errors against the true fraud labels contained in the dataset. Because the autoencoder was trained only on normal claim patterns, the evaluation focuses on whether larger reconstruction errors are associated with a greater likelihood of fraud.

![Figure 2. The frequency distribution of reconstruction errors of the test dataset.](figures/figure-2-reconstruction-error-distribution.png)

**Figure 2.** The frequency distribution of reconstruction errors of the test dataset.

A more detailed comparison between fraudulent and non-fraudulent claims is presented in Figure 2, which shows the reconstruction error distributions for both groups. The purpose of Figure 2 is to determine whether fraudulent claims tend to occur more frequently among larger reconstruction errors. If this pattern exists, reconstruction error can serve as a meaningful fraud risk signal. The distributions shown in Figure 2 reveal that non-fraudulent claims are concentrated at smaller reconstruction error values, typically below 1.0, while fraudulent claims appear more frequently among larger reconstruction errors. Although there is some overlap between the two groups, Figure 2 shows that fraudulent claims become increasingly common in the upper tail of the distribution. This pattern suggests that fraudulent claims often contain combinations of features that differ from those found in typical claims.

The effectiveness of the ranking approach can be further evaluated by examining the concentration of fraud among the highest-risk claims. When the 1,000 highest-risk claims were selected from the test dataset of 2,974 claims, the selected group contained 53 confirmed fraudulent claims. This corresponds to a precision of approximately 5.3 percent, which represents more than double the fraud rate expected through random selection given the dataset's overall fraud rate of approximately 2.49 percent.

![Figure 3. The frequency distribution of reconstruction error with respect to fraudulent and non-fraudulent claims.](figures/figure-3-reconstruction-error-by-fraud-status.png)

**Figure 3.** The frequency distribution of reconstruction error with respect to fraudulent and non-fraudulent claims.

Additional insight into the anomaly detection process is provided by Figure 3, which compares reconstruction errors between fraudulent and non-fraudulent claims. The purpose of Figure 3 is to visually assess whether fraud cases tend to appear at larger reconstruction error values than legitimate claims. In Figure 3, most legitimate claims are concentrated at lower error values, while fraudulent claims appear more frequently among higher reconstruction errors. Several fraudulent observations in Figure 3 appear at reconstruction error levels above approximately 2.0, while the majority of legitimate claims remain clustered below 1.0. The pattern shown in Figure 3 suggests that fraudulent claims often contain structural characteristics that the model cannot easily reconstruct. This behavior reinforces the usefulness of reconstruction error as a fraud risk indicator.

![Figure 4. A two-dimensional graphical representation of the latent space for non-fraudulent and fraudulent claims.](figures/figure-4-latent-space-fraud-status.png)

**Figure 4.** A two-dimensional graphical representation of the latent space for non-fraudulent and fraudulent claims.

To better understand how the model organizes claim patterns internally, a two-dimensional latent representation was generated using a secondary autoencoder model. The resulting visualization is shown in Figure 4, which displays each claim projected into a compressed two-dimensional feature space. The purpose of Figure 4 is to illustrate how the model groups claims according to structural similarity. The distribution shown in Figure 4 reveals that most claims cluster within a dense region near the center of the latent space. This central cluster indicates that many claims share similar structural characteristics. However, several observations appear farther away from this dense region, forming isolated points that represent structurally unusual claims. Some of these distant observations correspond to known fraudulent claims, indicating that the latent representation shown in Figure 4 helps illustrate how the model separates typical claims from anomalous ones.

![Figure 5. A two-dimensional graphical representation of the latent space highlighting the risk score by a radiation perturbation spectrum.](figures/figure-5-latent-space-risk-score.png)

**Figure 5.** A two-dimensional graphical representation of the latent space highlighting the risk score by a radiation perturbation spectrum.

The relationship between anomaly scores and latent space structure becomes clearer in Figure 5, where claims are colored according to their reconstruction error values. The purpose of Figure 5 is to demonstrate how anomaly magnitude corresponds to spatial structure within the latent feature space. The visualization shown in Figure 5 indicates that most dark-colored points are concentrated near the center of the latent space, representing claims with reconstruction errors typically below 1.0. In contrast, brighter points appear farther from the central cluster and correspond to much larger reconstruction errors. Several of the brightest observations shown in Figure 5 correspond to reconstruction errors greater than 8.0, indicating extremely unusual claims relative to the rest of the dataset. The pattern visible in Figure 5 therefore reinforces the relationship between spatial isolation and anomaly magnitude.

## *Conclusion*

This project demonstrates how unsupervised neural network models can assist in detecting potentially fraudulent insurance claims. By training an autoencoder on normal claim behavior, the model learns the structural patterns that characterize legitimate claims. Claims that deviate from those patterns generate larger reconstruction errors and are flagged as anomalies.

The analysis shows that the majority of claims follow consistent behavioral patterns within the dataset. However, a small subset of claims displays unusually large reconstruction errors. These claims represent potential anomalies that merit further review. The model's value lies in its ability to process large volumes of claims and highlight those that differ substantially from normal claim patterns. Instead of manually reviewing every claim, investigators can focus their attention on a prioritized list generated by the model. This approach improves investigative efficiency while maintaining the flexibility required for fraud detection, where fraudulent behavior often evolves and adapts over time.

## *Final Executive Recommendation*

The results of the anomaly detection analysis suggest that the autoencoder model can serve as an effective decision-support tool for identifying potentially fraudulent insurance claims. By learning the structural patterns present in legitimate claims, the model is able to detect unusual claim profiles through elevated reconstruction error values. Claims that produce larger reconstruction errors deviate more strongly from the typical claim patterns observed during training and therefore represent higher-risk candidates for further investigation. Rather than attempting to replace existing fraud detection systems, the model should be used to prioritize claims that merit closer review by fraud investigators.

In practice, the fraud scoring system can be integrated into the insurer's claims review workflow as an early-stage screening mechanism. Incoming claims can be processed by the trained autoencoder model and assigned a reconstruction error score that represents the level of anomaly relative to normal claims. Claims can then be ranked according to this risk score, allowing investigators to focus their attention on the highest-risk cases first. For example, investigators may begin by reviewing the top one to five percent of claims with the highest reconstruction errors, depending on available investigative resources. This prioritization approach allows organizations to allocate investigative effort more efficiently while still maintaining oversight of suspicious claims. The ranking output generated by the model also provides a flexible framework for adjusting fraud detection thresholds as operational needs evolve. If the organization wishes to investigate a larger portion of claims, the anomaly threshold can be lowered to include additional observations. Conversely, if investigative resources are limited, the organization may focus only on the most extreme anomalies identified by the model. This flexibility makes the system adaptable to different operational constraints while still providing a structured approach to identifying suspicious activity.

Although the autoencoder model demonstrates promising results for identifying anomalous claims, further improvements could strengthen its effectiveness in real-world deployment. Future work could incorporate hybrid approaches that combine unsupervised anomaly detection with supervised fraud classification models trained on confirmed fraud cases. Additional claim attributes, such as geographic risk factors or historical claim behavior, could also be incorporated to enhance the model's ability to capture complex fraud patterns. Furthermore, periodic retraining of the model with updated claim data would ensure that the system continues to adapt as fraud tactics evolve over time.

Overall, the anomaly detection framework developed in this project provides a scalable and data-driven method for prioritizing insurance claims according to potential fraud risk. By directing investigative attention toward the claims that deviate most strongly from normal behavior, insurers can reduce the time required to identify suspicious activity and improve the overall efficiency of their fraud detection processes.
