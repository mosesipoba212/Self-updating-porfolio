export async function GET(request) {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  console.log('Fetching GitHub projects for:', username);

  const headers = {
    'User-Agent': 'portfolio-app',
  };

  // Only add Authorization header if token exists
  if (token && token !== 'your_github_personal_access_token_here') {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=10`, {
      headers,
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('GitHub API error:', res.status, errorText);
      
      // Return empty array instead of error to prevent page crash
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: {
          'Cache-Control': 'no-store',
          'Content-Type': 'application/json',
        },
      });
    }

    const projects = await res.json();
    console.log('Fetched projects:', projects.map(p => p.name));

    return new Response(JSON.stringify(projects), {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching GitHub projects:', error);
    // Return empty array on error
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: {
        'Cache-Control': 'no-store',
        'Content-Type': 'application/json',
      },
    });
  }
}