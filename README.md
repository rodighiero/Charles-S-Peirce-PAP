
# Pictorial Index: Automating the Analysis of Charles S. Peirce’s PAP Manuscript

## About

This repository presents the **Pictorial Index**, a project of information design that employs computational methods to analyze and organize Charles S. Peirce’s manuscripts, particularly the renowned *Prolegomena for an Apology to Pragmatism* (PAP). Inspired by semiotic theory and leveraging advanced visualization, the project explores innovative ways to preserve and make accessible Peirce’s intellectual legacy.

This initiative aligns with broader efforts to digitize and classify cultural heritage, overcoming challenges posed by the vastness and complexity of Peirce's archive. For further reading, see [Picca, D., Schnyder, A., Kostina, E., Adamou, A., Rodighiero, D., & Schnapp, J. (2023). Orchestrating cultural heritage: Exploring the automated analysis and organization of Charles S. Peirce’s PAP manuscript. Proceedings of the 34th ACM Conference on Hypertext and Social Media. https://doi.org/10.1145/3603163.3609066](https://research.rug.nl/files/780076742/3603163.3609066.pdf)

## Features

- **Semantic Analysis**: Identifies thematic clusters across text units.
- **Data Visualization**: Produces cartographic views of text clusters.
- **Interactive Tools**: Supports dynamic exploration of the corpus.

## Getting Started

### Prerequisites

- Node.js
- Python with `spaCy` and `REBEL` installed

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/rodighiero/Charles-S-Peirce-PAP.git
   cd Charles-S-Peirce-PAP
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Launch Application**:
   ```bash
   npm start
   ```

Access the application at `http://localhost:8080/`.

## Methodology

This project follows a structured, automated workflow:

1. **Initial Processing**:
   - Manuscript images are processed via OCR and HTR using platforms like Transkribus.
2. **Text Analysis**:
   - Semantic proximity is measured through vectorized word embeddings.
3. **Visualization**:
   - Data clusters are mapped using UMAP, highlighting thematic relationships.

## Contribution

Contributions are welcome. Please submit a pull request or open an issue for discussion.

## License

Licensed under the MIT License.
