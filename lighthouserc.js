module.exports = {
    ci: {
        collect: {
            staticDistDir: './_site',
            url: ['/index.html', '/blog/index.html'],
            numberOfRuns: 3,
        },
        assert: {
            assertions: {
                'categories:performance': ['error', { minScore: 0.9 }],
                'categories:accessibility': ['error', { minScore: 0.95 }],
                'categories:best-practices': ['error', { minScore: 0.95 }],
                'categories:seo': ['error', { minScore: 0.95 }],
                'first-contentful-paint': ['error', { maxNumericValue: 1000 }],
                'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
                'interactive': ['error', { maxNumericValue: 3000 }],
                'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
            },
        },
        upload: {
            target: 'temporary-public-storage',
        },
    },
};
