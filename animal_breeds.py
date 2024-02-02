cat_breeds = [
    "Abyssinian",
    "American Curl",
    "American Shorthair",
    "Balinese",
    "Bengal",
    "Berman",
    "Bombay",
    "British Shorthair",
    "Burmilla",
    "Calico",
    "Chartreux",
    "Javanese",
    "Maine Coon"
    "Munchkin"
    "Norwegian Forest Cat",
    "Persian",
    "Ragdoll",
    "Russian Blue"
    "Scottish Fold",
    "Siamese",
    "Siberian"
    "Snowshoe"
    "Sphynx",
    "Tabby"
    "Tonkinese"
    "Tortoiseshell"
    "Tuxedo",
    "Unknown",
]

dog_breeds = [
    "Australian Cattle Dog",
    "Australian Shepherd",
    "Border Collie",
    "Beagle",
    "Belgian Malinois",
    "Bernese Mountain Dog"
    "Boston Terrier",
    "Boxer",
    "Bulldog",
    "Cane Corso",
    "Chihuahua",
    "Collie",
    "Dachshund",
    "Doberman",
    "Doberman Pinscher",
    "English Bulldog",
    "English Cocker Spaniel",
    "English Springer Spaniel",
    "French Bulldog",
    "German Shepherd",
    "German Shorthaired Pointer",
    "Giant Schnauzer",
    "Golden Retriever",
    "Great Dane",
    "Italian Greyhound"
    "Labrador Retriever",
    "Maltese",
    "Manchester Terrier"
    "Mastiff",
    "Miniature Schnauzer",
    "Mix/Mutt"
    "Papillon",
    "Pembroke Welsh Corgi",    
    "Poodle",
    "Pitbull",
    "Pitbull Mix",
    "Pug",
    "Shetland Sheepdog",
    "Shiba Inu",
    "Shih Tzu",
    "Siberian Husky",
    "Rottweiler",
    "Yorkshire Terriers",
    "Unknown",
]

import json

breed_data = {
    "cat_breeds": cat_breeds,
    "dog_breeds": dog_breeds,
}

breed_json = json.dumps(breed_data)