export default function Leaderboard() {
  return (
    <div className="h-screen flex flex-col items-center justify-evenly">
      <h1 className="text-3xl">Leaderboard</h1>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>Rank</th>
              <th>Username</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <td>khanz1</td>
              <td>1000</td>
            </tr>
            <tr>
              <th>2</th>
              <td>marhanura</td>
              <td>900</td>
            </tr>
            <tr>
              <th>3</th>
              <td>YanbiPanjaitan</td>
              <td>800</td>
            </tr>
            <tr>
              <th>4</th>
              <td>hilmidh</td>
              <td>700</td>
            </tr>
            <tr>
              <th>5</th>
              <td>DikiNovtrianda</td>
              <td>600</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
