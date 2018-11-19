import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header, Divider, Container } from 'semantic-ui-react'
import { withCurrentUser, Components, registerComponent } from 'meteor/vulcan:core';


class BooksPage extends PureComponent {
  render (){
    return (
      <Container text>
        <Divider hidden />
        <Header as="h1" textAlign="center"><Components.EditablePlainText contentKey={`books-title`} /></Header>
        <Components.EditableRichText contentKey={`books-body`} />
        <Divider hidden />
      </Container>
    )
  }
}
registerComponent('BooksPage', BooksPage, withCurrentUser);

class MoviesPage extends PureComponent {
  render (){
    return (
      <Container text>
        <Divider hidden />
        <Header as="h1" textAlign="center"><Components.EditablePlainText contentKey={`movies-title`} /></Header>
        <Components.EditableRichText contentKey={`movies-body`} />
        <Divider hidden />
      </Container>
    )
  }
}
registerComponent('MoviesPage', MoviesPage, withCurrentUser);

class LinksPage extends PureComponent {
  render (){
    return (
      <Container text>
        <Divider hidden />
        <Header as="h1" textAlign="center"><Components.EditablePlainText contentKey={`links-title`} /></Header>
        <Components.EditableRichText contentKey={`links-body`} />
        <Divider hidden />
      </Container>
    )
  }
}
registerComponent('LinksPage', LinksPage, withCurrentUser);

class CoolAppsPage extends PureComponent {
  render (){
    return (
      <Container text>
        <Divider hidden />
        <Header as="h1" textAlign="center"><Components.EditablePlainText contentKey={`cool-apps-title`} /></Header>
        <Components.EditableRichText contentKey={`cool-apps-body`} />
        <Divider hidden />
      </Container>
    )
  }
}
registerComponent('CoolAppsPage', CoolAppsPage, withCurrentUser);

class MediaPage extends PureComponent {
  render (){
    return (
      <Container text>
        <Divider hidden />
        <Header as="h1" textAlign="center"><Components.EditablePlainText contentKey={`media-title`} /></Header>
        <Components.PostsList terms={{view: 'tagged', tag: 'media'}}/>
        <Divider hidden />
      </Container>
    )
  }
}
registerComponent('MediaPage', MediaPage, withCurrentUser);

class CartoonsPage extends PureComponent {
  render (){
    return (
      <Container text>
        <Divider hidden />
        <Header as="h1" textAlign="center"><Components.EditablePlainText contentKey={`cartoons-title`} /></Header>
        <Components.PostsList terms={{view: 'tagged', tag: 'cartoons'}}/>
        <Divider hidden />
      </Container>
    )
  }
}
registerComponent('CartoonsPage', CartoonsPage, withCurrentUser);

class PhotosPage extends PureComponent {
  render (){
    return (
      <Container text>
        <Divider hidden />
        <Header as="h1" textAlign="center"><Components.EditablePlainText contentKey={`photos-title`} /></Header>
        <Components.PostsList terms={{view: 'tagged', tag: 'photos'}}/>
        <Divider hidden />
      </Container>
    )
  }
}
registerComponent('PhotosPage', PhotosPage, withCurrentUser);

class LocalIssuesPage extends PureComponent {
  render (){
    return (
      <Container text>
        <Divider hidden />
        <Header as="h1" textAlign="center"><Components.EditablePlainText contentKey={`local-issues-title`} /></Header>
        <Components.PostsList terms={{view: 'tagged', tag: 'local-issues'}}/>
        <Divider hidden />
      </Container>
    )
  }
}
registerComponent('LocalIssuesPage', LocalIssuesPage, withCurrentUser);

class AnalysisPage extends PureComponent {
  render (){
    return (
      <Container text>
        <Divider hidden />
        <Header as="h1" textAlign="center"><Components.EditablePlainText contentKey={`analysis-title`} /></Header>
        <Components.PostsList terms={{view: 'tagged', tag: 'analysis'}}/>
        <Divider hidden />
      </Container>
    )
  }
}
registerComponent('AnalysisPage', AnalysisPage, withCurrentUser);

class ClimateSciencePage extends PureComponent {
  render (){
    return (
      <Container text>
        <Divider hidden />
        <Header as="h1" textAlign="center"><Components.EditablePlainText contentKey={`climate-science-title`} /></Header>
        <Components.PostsList terms={{view: 'tagged', tag: 'climate-science'}}/>
        <Divider hidden />
      </Container>
    )
  }
}
registerComponent('ClimateSciencePage', ClimateSciencePage, withCurrentUser);

class WhatsNewPage extends PureComponent {
  render (){
    return (
      <Container text>
        <Divider hidden />
        <Header as="h1" textAlign="center"><Components.EditablePlainText contentKey={`whats-new-title`} /></Header>
        <Components.PostsList terms={{view: 'tagged', tag: 'whats-new'}}/>
        <Divider hidden />
      </Container>
    )
  }
}
registerComponent('WhatsNewPage', WhatsNewPage, withCurrentUser);

class CalendarPage extends PureComponent {
  render (){
    return (
      <Container text>
        <Divider hidden />
        <Header as="h1" textAlign="center"><Components.EditablePlainText contentKey={`calendar-title`} /></Header>
        <Components.EditableRichText contentKey={`calendar-body`} />
        <Divider hidden />
      </Container>
    )
  }
}
registerComponent('CalendarPage', CalendarPage, withCurrentUser);

class NewsletterPage extends PureComponent {
  render (){
    return (
      <Container text>
        <Divider hidden />
        <Header as="h1" textAlign="center"><Components.EditablePlainText contentKey={`newsletter-title`} /></Header>
        <Components.PostsList terms={{view: 'tagged', tag: 'newsletter'}}/>
        <Divider hidden />
      </Container>
    )
  }
}
registerComponent('NewsletterPage', NewsletterPage, withCurrentUser);

class NewsReleases extends PureComponent {
  render (){
    return (
      <Container text>
        <Divider hidden />
        <Header as="h1" textAlign="center"><Components.EditablePlainText contentKey={`news-releases-title`} /></Header>
        <Components.PostsList terms={{view: 'tagged', tag: 'news-release'}}/>
        <Divider hidden />
      </Container>
    )
  }
}
registerComponent('NewsReleases', NewsReleases, withCurrentUser);

class AboutUsPage extends PureComponent {
  render (){
    return (
      <Container text>
        <Divider hidden />
        <Header as="h1" textAlign="center"><Components.EditablePlainText contentKey={`about-us-title`} /></Header>
        <Components.EditableRichText contentKey={`about-us-body`} />
        <Divider hidden />
      </Container>
    )
  }
}
registerComponent('AboutUsPage', AboutUsPage, withCurrentUser);

class HistoryPage extends PureComponent {
  render (){
    return (
      <Container text>
        <Divider hidden />
        <Header as="h1" textAlign="center"><Components.EditablePlainText contentKey={`history-title`} /></Header>
        <Components.EditableRichText contentKey={`history-body`} />
        <Divider hidden />
      </Container>
    )
  }
}
registerComponent('HistoryPage', HistoryPage, withCurrentUser);

class DirectorsPage extends PureComponent {
  render (){
    return (
      <Container text>
        <Divider hidden />
        <Header as="h1" textAlign="center"><Components.EditablePlainText contentKey={`directors-title`} /></Header>
        <Components.EditableRichText contentKey={`directors-body`} />
        <Divider hidden />
      </Container>
    )
  }
}
registerComponent('DirectorsPage', DirectorsPage, withCurrentUser);
