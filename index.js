const cheerio = require('cheerio')
const rp = require('request-promise')
const SEC_URL = 'https://secsearch.sec.gov/search/docs?utf8=%E2%9C%93&affiliate=secsearch&sort_by=&dc=655&query=proshares+bitcoin'
const {
	log,
	dir,
	error
} = console

async function main() {
	try {
		const options = {
			uri: SEC_URL
		}
		const data = await rp(SEC_URL)
		const $ = cheerio.load(data)
		const title = $('#result-1 > h4.title > a').text()
		if (title.includes('ProShares') && title.includes('Bitcoin') && (title.includes('Approve') || title.includes('Approval') || title.includes('Approving'))) {
			log('ETF approved')
		} else if (title.includes('ProShares') && title.includes('Bitcoin') && (title.includes('Disapprove') || title.includes('Disapproval') || title.includes('Disapproving'))) {
			log('ETF not approved')
		} else {
			log('Nothing matches for approval or disapproval.')
		}
	} catch (e) {
		error(e)
	}
}

main()
