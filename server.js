// Requirements for importing packages
const express = require('express')
const path = require('path')
const fs = require('fs')

// Initialize PORT and Express Application
const PORT = process.env.PORT || 3001;
const app = express()