// There are several methods of modelling relationships between documents

// There is a tradeoff between query performance and consistency

// Using references (Normalization) - CONSISTENCY

let author = {
    name: 'Yan'
}

let course = {
    author: 'id'
}

// Using Embedded Documents (Denormaliation) - PERFORMANCE

let course = {
    author: {
        name: 'Yan'
    }
}


// Hybrid method

let author = {
    name: 'Yan'
        // 50 other properties
}

let course = {
    author: {
        id: 'reference',
        name: 'Yan'
    }
}